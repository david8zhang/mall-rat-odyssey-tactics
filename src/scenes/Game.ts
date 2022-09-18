import Phaser from 'phaser'
import { Grid } from '~/core/Grid'
import { Direction } from '~/utils/Directions'
import { GameConstants } from '~/utils/GameConstants'
import { PlayerConstants } from '~/utils/PlayerConstants'

export default class Game extends Phaser.Scene {
  public tileMap!: Phaser.Tilemaps.Tilemap
  public grid!: Grid
  public cameraPanEvent: Phaser.Time.TimerEvent | null = null
  private static _instance: Game

  constructor() {
    super('game')
    Game._instance = this
  }

  public static get instance() {
    return Game._instance
  }

  create() {
    this.initCamera()
    this.initTilemap()
    this.initGrid()
    this.initPlayer()
  }

  initCamera() {
    this.cameras.main.setBounds(0, 0, GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT)
  }

  initGrid() {
    this.grid = new Grid(this, {
      width: GameConstants.GAME_WIDTH,
      height: GameConstants.GAME_HEIGHT,
      cellSize: GameConstants.TILE_SIZE,
    })
    this.grid.showGrid()
  }

  startCameraPan(direction: Direction) {
    switch (direction) {
      case Direction.LEFT: {
        this.cameraPanEvent = this.time.addEvent({
          delay: 10,
          repeat: -1,
          callback: () => {
            this.cameras.main.scrollX -= GameConstants.CAMERA_SCORLL_SPEED
          },
        })
        break
      }
      case Direction.RIGHT: {
        this.cameraPanEvent = this.time.addEvent({
          delay: 10,
          repeat: -1,
          callback: () => {
            this.cameras.main.scrollX += GameConstants.CAMERA_SCORLL_SPEED
          },
        })
        break
      }
      case Direction.UP: {
        this.cameraPanEvent = this.time.addEvent({
          delay: 10,
          repeat: -1,
          callback: () => {
            this.cameras.main.scrollY -= GameConstants.CAMERA_SCORLL_SPEED
          },
        })
        break
      }
      case Direction.DOWN: {
        this.cameraPanEvent = this.time.addEvent({
          delay: 10,
          repeat: -1,
          callback: () => {
            this.cameras.main.scrollY += GameConstants.CAMERA_SCORLL_SPEED
          },
        })
        break
      }
    }
  }

  stopCameraPan() {
    if (this.cameraPanEvent) {
      this.cameraPanEvent.paused = true
      this.cameraPanEvent.destroy()
      this.cameraPanEvent = null
    }
  }

  initPlayer() {
    const playerConfigs = PlayerConstants.START_CONFIG
    const playerUnits: Phaser.GameObjects.Sprite[] = []
    playerConfigs.forEach((player) => {
      const rowColPos = player.rowColPos
      const cell = this.grid.getCellAtRowCol(rowColPos[0], rowColPos[1])
      const sprite = this.add.sprite(cell.centerX, cell.centerY, player.texture)
      playerUnits.push(sprite)
    })
    const playerUnit = playerUnits[0]
    this.cameras.main.centerOn(playerUnit.x, playerUnit.y)
  }

  initTilemap() {
    this.tileMap = this.make.tilemap({
      key: 'sample-map',
    })
    const tileset = this.tileMap.addTilesetImage('tilemap_packed', 'tilemap_packed')
    this.createLayer('Layer1', tileset)
  }

  createLayer(layerName: string, tileset: Phaser.Tilemaps.Tileset) {
    this.tileMap.createLayer(layerName, tileset)
  }
}
