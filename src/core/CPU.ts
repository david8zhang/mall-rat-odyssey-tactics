import Game from '~/scenes/Game'
import { GameConstants } from '~/utils/GameConstants'
import { Side } from '~/utils/Side'
import { Blackboard } from './behavior-tree/Blackboard'
import { Unit } from './Unit'

export class CPU {
  private game: Game
  public units: Unit[] = []
  constructor(game: Game) {
    this.game = game
    this.initUnits()
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
  }

  getLivingUnits() {
    return this.units.filter((unit: Unit) => !unit.isDead)
  }

  startTurn() {
    this.moveUnits()
  }

  moveUnits() {
    this.units.forEach((unit: Unit) => {})
  }

  setupBehaviorTree() {
    const blackboard = new Blackboard()
  }
}
