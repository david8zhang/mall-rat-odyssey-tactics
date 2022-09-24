import Game from '~/scenes/Game'
import { GameConstants } from '~/utils/GameConstants'
import { Player } from './Player'

export interface UnitConfig {
  texture: string
  position: {
    x: number
    y: number
  }
  moveRange: number
  player: Player
}

export class Unit {
  private sprite: Phaser.GameObjects.Sprite
  private game: Game
  private moveRange: number
  public moveableSquares: Phaser.GameObjects.Rectangle[] = []
  public player: Player

  constructor(game: Game, unitConfig: UnitConfig) {
    this.game = game
    this.sprite = this.game.add
      .sprite(unitConfig.position.x, unitConfig.position.y, unitConfig.texture)
      .setDepth(5)
    this.player = unitConfig.player
    this.moveRange = unitConfig.moveRange
  }

  public highlight() {
    this.sprite.setTint(0xff0000)
    this.highlightMoveableSquares()
  }

  highlightMoveableSquares() {
    const cell = this.game.grid.getCellAtWorldPosition(this.sprite.x, this.sprite.y)
    const currCoordinates = [cell.gridRow, cell.gridCol, 0]
    const queue = [currCoordinates]
    const seen = new Array(this.game.grid.numRows)
      .fill(false)
      .map(() => new Array(this.game.grid.numCols).fill(false))
    while (queue.length > 0) {
      const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]
      const currNode = queue.shift()
      if (currNode && !seen[currNode[0]][currNode[1]]) {
        seen[currNode[0]][currNode[1]] = true
        directions.forEach((dir) => {
          const newRow = currNode[0] + dir[0]
          const newCol = currNode[1] + dir[1]
          const newDistance = currNode[2] + 1
          if (this.game.grid.withinBounds(newRow, newCol) && newDistance <= this.moveRange) {
            if (!this.wallTileAtPosition(newRow, newCol)) {
              queue.push([newRow, newCol, newDistance])
            }
          }
        })
      }
    }
    for (let i = 0; i < seen.length; i++) {
      for (let j = 0; j < seen[0].length; j++) {
        if (seen[i][j] && !this.unitAtPosition(i, j)) {
          const cell = this.game.grid.getCellAtRowCol(i, j)
          const newRect = this.game.add
            .rectangle(
              cell.centerX,
              cell.centerY,
              GameConstants.TILE_SIZE,
              GameConstants.TILE_SIZE,
              0x0000ff,
              0.5
            )
            .setDepth(this.sprite.depth - 1)
          this.moveableSquares.push(newRect)
        }
      }
    }
  }

  unitAtPosition(row: number, col: number) {
    for (let i = 0; i < this.player.playerUnits.length; i++) {
      const unit = this.player.playerUnits[i]
      const rowCol = unit.getRowCol()
      if (rowCol.row === row && rowCol.col === col && unit !== this) {
        return true
      }
    }
    return false
  }

  wallTileAtPosition(row: number, col: number) {
    const tile = this.game.tileMap.getTileAt(col, row)
    if (!tile) {
      return false
    }
    return tile.layer.name === 'Walls'
  }

  public dehighlight() {
    this.sprite.clearTint()
    this.moveableSquares.forEach((square) => {
      square.destroy()
    })
    this.moveableSquares = []
  }

  isSquareWithinMoveableSquares(row: number, col: number) {
    for (let i = 0; i < this.moveableSquares.length; i++) {
      const square = this.moveableSquares[i]
      const cell = this.game.grid.getCellAtWorldPosition(square.x, square.y)
      if (row === cell.gridRow && col === cell.gridCol) {
        return true
      }
    }
    return false
  }

  public get x() {
    return this.sprite.x
  }

  public get y() {
    return this.sprite.y
  }

  public getRowCol() {
    const cell = this.game.grid.getCellAtWorldPosition(this.sprite.x, this.sprite.y)
    return {
      row: cell.gridRow,
      col: cell.gridCol,
    }
  }

  public moveToRowColPosition(row: number, col: number) {
    const cell = this.game.grid.getCellAtRowCol(row, col)
    this.sprite.setPosition(cell.centerX, cell.centerY)
  }
}
