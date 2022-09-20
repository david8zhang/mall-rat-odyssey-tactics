import Game from '~/scenes/Game'
import { Direction } from '~/utils/Directions'
import { PlayerConstants } from '~/utils/PlayerConstants'
import { Cursor } from './Cursor'

export class Player {
  private game: Game
  private cursor: Cursor
  public playerUnits: Phaser.GameObjects.Sprite[] = []

  constructor(game: Game) {
    this.game = game
    this.initUnits()
    this.cursor = new Cursor(this.game, {
      x: this.playerUnits[0].x,
      y: this.playerUnits[1].y,
    })
    this.initKeyboardListener()
  }

  initKeyboardListener() {
    this.game.input.keyboard.on('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown': {
          this.cursor.moveUnitsInDirection(Direction.DOWN, 1)
          break
        }
        case 'ArrowLeft': {
          this.cursor.moveUnitsInDirection(Direction.LEFT, 1)
          break
        }
        case 'ArrowRight': {
          this.cursor.moveUnitsInDirection(Direction.RIGHT, 1)
          break
        }
        case 'ArrowUp': {
          this.cursor.moveUnitsInDirection(Direction.UP, 1)
          break
        }
      }
    })
  }

  initUnits() {
    const playerConfigs = PlayerConstants.START_CONFIG
    playerConfigs.forEach((player) => {
      const rowColPos = player.rowColPos
      const cell = this.game.grid.getCellAtRowCol(rowColPos[0], rowColPos[1])
      const sprite = this.game.add.sprite(cell.centerX, cell.centerY, player.texture)
      this.playerUnits.push(sprite)
    })
    const playerUnit = this.playerUnits[0]
    this.game.cameras.main.centerOn(playerUnit.x, playerUnit.y)
  }
}
