import Game from '~/scenes/Game'
import { Direction } from '~/utils/Directions'
import { PlayerConstants } from '~/utils/PlayerConstants'
import { Cursor } from './Cursor'
import { Unit } from './Unit'

export class Player {
  private game: Game
  private cursor: Cursor
  public playerUnits: Unit[] = []
  public selectedUnit: Unit | null = null

  constructor(game: Game) {
    this.game = game
    this.initUnits()
    this.cursor = new Cursor(this.game, {
      x: this.playerUnits[0].x,
      y: this.playerUnits[1].y,
    })
    this.initKeyboardListener()
    this.initMouseClickListener()
  }

  initMouseClickListener() {
    this.game.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const cell = this.game.grid.getCellAtWorldPosition(pointer.worldX, pointer.worldY)
      this.cursor.moveToRowCol(cell.gridRow, cell.gridCol)
    })
  }

  initKeyboardListener() {
    this.game.input.keyboard.on('keydown', (e) => {
      switch (e.code) {
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
        case 'Space': {
          if (this.selectedUnit) {
            this.movePlayerToCursorPosition()
            this.selectedUnit.dehighlight()
            this.selectedUnit = null
          } else {
            const playerAtCursor = this.getPlayerAtCursor()
            if (playerAtCursor) {
              playerAtCursor.highlight()
              this.selectedUnit = playerAtCursor
            }
          }
        }
      }
    })
  }

  movePlayerToCursorPosition() {
    const gridRowCol = this.cursor.gridRowColPosition
    if (
      this.selectedUnit &&
      this.selectedUnit.isSquareWithinMoveableSquares(gridRowCol.row, gridRowCol.col)
    ) {
      this.selectedUnit.moveToRowColPosition(gridRowCol.row, gridRowCol.col)
    }
  }

  getPlayerAtCursor() {
    const playerAtCursor = this.playerUnits.find((playerUnit: Unit) => {
      const { row, col } = playerUnit.getRowCol()
      const gridRowCol = this.cursor.gridRowColPosition
      return row === gridRowCol.row && col === gridRowCol.col
    })
    return playerAtCursor !== undefined ? playerAtCursor : null
  }

  initUnits() {
    const playerConfigs = PlayerConstants.START_CONFIG
    playerConfigs.forEach((playerConfig) => {
      const rowColPos = playerConfig.rowColPos
      const cell = this.game.grid.getCellAtRowCol(rowColPos[0], rowColPos[1])
      const playerUnit = new Unit(this.game, {
        position: {
          x: cell.centerX,
          y: cell.centerY,
        },
        texture: playerConfig.texture,
        moveRange: 4,
        player: this,
      })
      this.playerUnits.push(playerUnit)
    })
    const playerUnitToFocusOn = this.playerUnits[0]
    this.game.cameras.main.centerOn(playerUnitToFocusOn.x, playerUnitToFocusOn.y)
  }
}
