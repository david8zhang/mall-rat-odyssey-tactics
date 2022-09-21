import Game from '~/scenes/Game'

export interface UnitConfig {
  texture: string
  position: {
    x: number
    y: number
  }
  moveRange: number
}

export class Unit {
  private sprite: Phaser.GameObjects.Sprite
  private game: Game
  private moveRange: number

  constructor(game: Game, unitConfig: UnitConfig) {
    this.game = game
    this.sprite = this.game.add.sprite(
      unitConfig.position.x,
      unitConfig.position.y,
      unitConfig.texture
    )
    this.moveRange = unitConfig.moveRange
  }

  public highlight() {
    this.sprite.setTint(0xff0000)
  }

  public dehighlight() {
    this.sprite.clearTint()
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
