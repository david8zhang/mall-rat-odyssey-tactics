import Game from '~/scenes/Game'
import { Cell } from './Cell'

// Note: All cell sizes must be square!
export interface GridConfig {
  width: number
  height: number
  cellSize: number
}

export class Grid {
  private game: Game
  public grid: Cell[][] = []
  public graphics: Phaser.GameObjects.Graphics

  constructor(game: Game, config: GridConfig) {
    this.game = game
    this.graphics = this.game.add.graphics()
    this.initGrid(config)
  }

  initGrid(config: GridConfig) {
    const numCellsWidth = config.width / config.cellSize
    const numCellsHeight = config.height / config.cellSize
    let xPos = 0
    let yPos = 0
    this.grid = new Array(numCellsHeight).fill(null).map(() => new Array(numCellsHeight).fill(null))
    for (let i = 0; i < numCellsWidth; i++) {
      xPos = 0
      for (let j = 0; j < numCellsHeight; j++) {
        this.grid[i][j] = new Cell(this.game, {
          inGameX: xPos,
          inGameY: yPos,
          gridRow: i,
          gridCol: j,
          cellSize: config.cellSize,
        })
        xPos += config.cellSize
      }
      yPos += config.cellSize
    }
  }

  showGrid() {
    this.graphics.lineStyle(1, 0x777777, 0.2)
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        const cell = this.grid[i][j]
        this.graphics.strokeRectShape(cell.rectangle)
      }
    }
  }

  hideGrid() {
    this.graphics.clear()
  }

  getCellAtRowCol(row: number, col: number) {
    return this.grid[col][row]
  }
}
