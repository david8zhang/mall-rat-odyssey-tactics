import Game from '~/scenes/Game'
import { Direction } from '~/utils/Directions'
import { PlayerConstants } from '~/utils/PlayerConstants'
import { Side } from '~/utils/Side'
import { Cursor } from './Cursor'
import { Unit } from './Unit'

export class Player {
  private game: Game
  private cursor: Cursor
  public units: Unit[] = []
  public selectedUnit: Unit | null = null

  constructor(game: Game) {
    this.game = game
    this.initUnits()
    this.cursor = new Cursor(this.game, {
      x: this.units[0].x,
      y: this.units[1].y,
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
          if (this.game.currTurn === Side.PLAYER) {
            if (this.selectedUnit) {
              if (this.canMovePlayerToCursorPosition()) {
                this.movePlayerToCursorPosition()
                this.selectedUnit.dehighlight()
                this.selectedUnit.setHasMoved(true)
                this.selectedUnit = null
                if (this.hasLastUnitMoved()) {
                  this.switchTurn()
                }
              }
            } else {
              if (this.canHighlightPlayerForMovement()) {
                const playerAtCursor = this.getPlayerAtCursor()
                playerAtCursor!.highlight()
                this.selectedUnit = playerAtCursor
              }
            }
          }
        }
      }
    })
  }

  startTurn() {
    this.units.forEach((unit) => {
      unit.setHasMoved(false)
    })
  }

  hasLastUnitMoved() {
    for (let i = 0; i < this.units.length; i++) {
      const unit = this.units[i]
      if (!unit.hasMoved) {
        return false
      }
    }
    return true
  }

  switchTurn() {
    this.game.setTurn(Side.CPU)
  }

  unitAtPosition(row: number, col: number, selectedUnit: Unit) {
    for (let i = 0; i < this.units.length; i++) {
      const unit = this.units[i]
      const rowCol = unit.getRowCol()
      if (rowCol.row === row && rowCol.col === col && unit !== selectedUnit) {
        return true
      }
    }
    return false
  }

  movePlayerToCursorPosition() {
    const gridRowCol = this.cursor.gridRowColPosition
    this.selectedUnit!.moveToRowColPosition(gridRowCol.row, gridRowCol.col)
  }

  canHighlightPlayerForMovement() {
    const playerAtCursor = this.getPlayerAtCursor()
    return playerAtCursor != null && !playerAtCursor.hasMoved
  }

  canMovePlayerToCursorPosition(): boolean {
    const gridRowCol = this.cursor.gridRowColPosition
    return (
      this.selectedUnit != null &&
      this.selectedUnit.isSquareWithinMoveableSquares(gridRowCol.row, gridRowCol.col) &&
      !this.unitAtPosition(gridRowCol.row, gridRowCol.col, this.selectedUnit)
    )
  }

  getPlayerAtCursor() {
    const playerAtCursor = this.units.find((playerUnit: Unit) => {
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
      })
      this.units.push(playerUnit)
    })
    const playerUnitToFocusOn = this.units[0]
    this.game.cameras.main.centerOn(playerUnitToFocusOn.x, playerUnitToFocusOn.y)
  }
}
