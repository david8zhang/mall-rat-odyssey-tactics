import { Scene } from 'phaser'

export interface CellConfig {
  gridRow: number
  gridCol: number
  inGameX: number
  inGameY: number
  cellSize: number
}

export class Cell {
  public gridRow: number
  public gridCol: number
  public centerX: number
  public centerY: number
  public rectangle: Phaser.Geom.Rectangle
  private scene: Scene

  constructor(scene: Scene, config: CellConfig) {
    this.scene = scene
    this.gridRow = config.gridRow
    this.gridCol = config.gridCol

    this.rectangle = new Phaser.Geom.Rectangle(
      config.inGameX,
      config.inGameY,
      config.cellSize,
      config.cellSize
    )

    // Get the center of the tile as its in game position
    this.centerX = config.inGameX + config.cellSize / 2
    this.centerY = config.inGameY + config.cellSize / 2
  }
}
