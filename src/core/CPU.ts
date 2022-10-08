import Game, { GameOverConditions } from '~/scenes/Game'
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

  constructor(game: Game) {
    this.game = game
    this.initUnits()
    this.setupBehaviorTree()
  }

  initUnits() {
    GameConstants.CPU_START_CONFIG.forEach((unitConfig) => {
      const rowColPos = unitConfig.rowColPos
      const cell = this.game.grid.getCellAtRowCol(rowColPos[0], rowColPos[1])
      const unit = new Unit(this.game, {
        position: {
          x: cell.centerX,
          y: cell.centerY,
        },
        texture: unitConfig.texture,
        moveRange: 4,
        attackRange: 1,
        maxHealth: 50,
        name: unitConfig.name,
      })
      this.units.push(unit)
    })
    this.unitToMove = this.units[this.unitToMoveIndex]
  }

  getLivingUnits() {
    return this.units.filter((unit: Unit) => !unit.isDead)
  }

  startTurn() {
    const winCondition = this.getWinCondition()
    if (winCondition != GameOverConditions.IN_PROGRESS) {
      // Handle win condition satisfied
    } else {
      this.moveUnits()
    }
  }

  getWinCondition() {
    if (this.game.player.getLivingUnits().length === 0) {
      return GameOverConditions.CPU_WIN
    } else if (this.getLivingUnits().length === 0) {
      return GameOverConditions.PLAYER_WIN
    } else {
      return GameOverConditions.IN_PROGRESS
    }
  }

  moveNextUnit() {
    if (this.unitToMove) {
      this.unitToMove.setHasMoved(true)
    }
    this.unitToMoveIndex++
    const livingUnits = this.getLivingUnits()
    this.unitToMove = livingUnits[this.unitToMoveIndex]
    this.game.time.delayedCall(500, () => {
      this.moveUnits()
    })
  }

  switchTurn() {
    this.unitToMoveIndex = 0
    this.getLivingUnits().forEach((unit) => {
      unit.setHasMoved(false)
    })
    this.game.setTurn(Side.PLAYER)
  }

  moveUnits() {
    this.behaviorTree.tick()
  }

  onUnitMoveComplete() {
    const livingUnits = this.getLivingUnits()
    if (this.unitToMoveIndex === livingUnits.length - 1) {
      this.switchTurn()
    } else {
      this.moveNextUnit()
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
