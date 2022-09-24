import Game from '~/scenes/Game'
import { Direction } from '~/utils/Directions'
import { GameConstants } from '~/utils/GameConstants'
import { Cell } from './Cell'

export class Cursor {
  private game: Game
  private position: {
    x: number
    y: number
  }
  public gridRowColPosition: {
    row: number
    col: number
  }

  public sprite: Phaser.GameObjects.Sprite
  constructor(game: Game, defaultPosition: { x: number; y: number }) {
    this.game = game
    this.position = defaultPosition
    this.sprite = this.game.add.sprite(this.position.x, this.position.y, 'cursor').setDepth(100)
    const cell: Cell = this.game.grid.getCellAtWorldPosition(this.position.x, this.position.y)
    this.gridRowColPosition = {
      row: cell.gridRow,
      col: cell.gridCol,
    }
  }

  moveUnitsInDirection(direction: Direction, units: number) {
    switch (direction) {
      case Direction.UP: {
        let targetRow = Math.max(this.gridRowColPosition.row - units, 0)
        let targetCol = this.gridRowColPosition.col
        this.moveToRowCol(targetRow, targetCol)
        break
      }
      case Direction.DOWN: {
        let targetRow = Math.min(this.gridRowColPosition.row + units, this.game.grid.numRows - 1)
        let targetCol = this.gridRowColPosition.col
        this.moveToRowCol(targetRow, targetCol)
        break
      }
      case Direction.LEFT: {
        let targetRow = this.gridRowColPosition.row
        let targetCol = Math.max(this.gridRowColPosition.col - units, 0)
        this.moveToRowCol(targetRow, targetCol)
        break
      }
      case Direction.RIGHT: {
        let targetRow = this.gridRowColPosition.row
        let targetCol = Math.min(this.gridRowColPosition.col + units, this.game.grid.numCols - 1)
        this.moveToRowCol(targetRow, targetCol)
        break
      }
    }
    this.panCameraIfNecessary(this.gridRowColPosition.row, this.gridRowColPosition.col)
  }

  moveToRowCol(row: number, col: number) {
    const cell = this.game.grid.getCellAtRowCol(row, col)
    this.sprite.setPosition(cell.centerX, cell.centerY)
    console.log(`Moved cursor to: ${row}, ${col}`)
    this.gridRowColPosition = { row, col }
  }

  panCameraIfNecessary(targetRow: number, targetCol: number) {
    const camera = this.game.cameras.main
    const cell = this.game.grid.getCellAtRowCol(targetRow, targetCol)

    const cameraLeftBound = camera.midPoint.x - camera.width / 2
    const cameraRightBound = camera.midPoint.x + camera.width / 2
    const cameraUpperBound = camera.midPoint.y - camera.height / 2
    const cameraLowerBound = camera.midPoint.y + camera.height / 2

    if (cell.centerX <= cameraLeftBound) {
      camera.scrollX -= GameConstants.TILE_SIZE
    }
    if (cell.centerX >= cameraRightBound) {
      camera.scrollX += GameConstants.TILE_SIZE
    }
    if (cell.centerY >= cameraLowerBound) {
      camera.scrollY += GameConstants.TILE_SIZE
    }
    if (cell.centerY <= cameraUpperBound) {
      camera.scrollY -= GameConstants.TILE_SIZE
    }
  }
}
