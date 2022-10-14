import Game, { GameOverConditions, InitialUnitConfig } from '~/scenes/game/Game'
import { AttackDirection, GameUI } from '~/scenes/game/GameUI'
import { GameConstants } from '~/utils/GameConstants'
import { Side } from '~/utils/Side'
import { BehaviorTreeNode } from './behavior-tree/BehaviorTreeNode'
import { Blackboard } from './behavior-tree/Blackboard'
import { SelectorNode } from './behavior-tree/SelectorNode'
import { SequenceNode } from './behavior-tree/SequenceNode'
import { AttackPlayerUnit } from './behaviors/attack-player/AttackPlayerUnit'
import { GetPlayerUnitToTarget } from './behaviors/attack-player/GetPlayerUnitToTarget'
import { MoveUnitNextToTarget } from './behaviors/attack-player/MoveUnitNextToTarget'
import { GetSquareToMove } from './behaviors/move-to-player/GetSquareToMove'
import { MoveUnitToSquare } from './behaviors/move-to-player/MoveUnitToSquare'
import { PopulateBlackboard } from './behaviors/PopulateBlackboard'
import { Retreat } from './behaviors/retreat/Retreat'
import { ShouldRetreat } from './behaviors/retreat/ShouldRetreat'
import { Unit } from './Unit'

export class CPU {
  private game: Game
  public units: Unit[] = []
  public unitToMoveIndex: number = 0
  public unitToMove: Unit | null = null
  public behaviorTree!: BehaviorTreeNode

  constructor(game: Game, cpuConfig: InitialUnitConfig[]) {
    this.game = game
    this.initUnits(cpuConfig)
    this.setupBehaviorTree()
  }

  initUnits(cpuConfig: InitialUnitConfig[]) {
    cpuConfig.forEach((unitConfig) => {
      const rowColPos = unitConfig.rowColPos
      const cell = this.game.grid.getCellAtRowCol(rowColPos[0], rowColPos[1])
      const unit = new Unit(this.game, {
        position: {
          x: cell.centerX,
          y: cell.centerY,
        },
        texture: unitConfig.texture,
        moveRange: unitConfig.moveRange,
        attackRange: unitConfig.attackRange,
        maxHealth: unitConfig.maxHealth,
        name: unitConfig.name,
        unitType: unitConfig.unitType,
      })
      this.units.push(unit)
    })
    this.unitToMove = this.units[this.unitToMoveIndex]
  }

  getLivingUnits() {
    return this.units.filter((unit: Unit) => !unit.isDead)
  }

  startTurn() {
    GameUI.instance.configureAttackAnimationModal(AttackDirection.RIGHT)
    this.moveUnits()
  }

  moveNextUnit() {
    this.unitToMoveIndex++
    const livingUnits = this.getLivingUnits()
    this.unitToMove = livingUnits[this.unitToMoveIndex]
    this.game.time.delayedCall(500, () => {
      this.moveUnits()
    })
  }

  switchTurn() {
    this.game.time.delayedCall(500, () => {
      this.unitToMoveIndex = 0
      this.unitToMove = this.units[this.unitToMoveIndex]
      this.getLivingUnits().forEach((unit) => {
        unit.setHasMoved(false)
      })
      this.game.setTurn(Side.PLAYER)
    })
  }

  moveUnits() {
    this.behaviorTree.tick()
  }

  onUnitMoveComplete() {
    if (this.unitToMove) {
      this.unitToMove.setHasMoved(true)
    }
    // Check if the game win condition has been satisfied
    const gameOverCondition = this.game.getGameOverCondition()
    if (gameOverCondition !== GameOverConditions.IN_PROGRESS) {
      this.game.handleGameOverCondition(gameOverCondition)
    } else {
      const livingUnits = this.getLivingUnits()
      if (this.unitToMoveIndex === livingUnits.length - 1) {
        this.switchTurn()
      } else {
        this.moveNextUnit()
      }
    }
  }

  setupBehaviorTree() {
    const blackboard = new Blackboard()
    const topLevelSequenceNode = new SequenceNode('TopLevel', blackboard, [
      new PopulateBlackboard(blackboard, this),
      new SelectorNode(
        'AdvanceOrRetreat',
        blackboard,
        new SequenceNode('RetreatSequence', blackboard, [
          new ShouldRetreat(blackboard),
          new Retreat(blackboard),
        ]),
        new SelectorNode(
          'AttackOrMove',
          blackboard,
          new SequenceNode('AttackSequence', blackboard, [
            new GetPlayerUnitToTarget(blackboard),
            new MoveUnitNextToTarget(blackboard),
            new AttackPlayerUnit(blackboard),
          ]),
          new SequenceNode('MoveSequence', blackboard, [
            new GetSquareToMove(blackboard),
            new MoveUnitToSquare(blackboard),
          ])
        )
      ),
    ])
    this.behaviorTree = topLevelSequenceNode
  }
}
