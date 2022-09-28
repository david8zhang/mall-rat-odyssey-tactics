import Game from '~/scenes/Game'
import { GameConstants } from '~/utils/GameConstants'
import { Side } from '~/utils/Side'
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
      const playerUnit = new Unit(this.game, {
        position: {
          x: cell.centerX,
          y: cell.centerY,
        },
        texture: unitConfig.texture,
        moveRange: 4,
        attackRange: 1,
        maxHealth: 50,
      })
      this.units.push(playerUnit)
    })
  }

  startTurn() {
    this.moveUnits()
  }

  moveUnits() {
    // TODO: Add logic to move CPU units
    // For now, just switch turn back to player
    this.game.setTurn(Side.PLAYER)
  }
}
