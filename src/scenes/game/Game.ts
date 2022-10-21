import Phaser from 'phaser'
import { createSlashAnims } from '~/core/anims/createSlashAnims'
import { CPU } from '~/core/CPU'
import { Grid } from '~/core/Grid'
import { Player } from '~/core/Player'
import { Unit } from '~/core/units/Unit'
import { Direction } from '~/config/Directions'
import { GameConstants } from '~/scenes/game/GameConstants'
import { Side } from '~/config/Side'
import { UnitTypes } from '~/core/units/UnitConstants'
import { SceneController } from '../SceneController'
import { AttackDirection, GameUI } from './GameUI'
import { DialogLine } from '../dialog/DialogConstants'
import { CutsceneOverlay } from '../cutscene/CutsceneOverlay'

export interface InitialUnitConfig {
  rowColPos: number[]
  texture: string
  name: string
  moveRange: number
  attackRange: number
  maxHealth: number
  unitType: UnitTypes
  baseDamageAmount: number
}

export interface GameConfig {
  shouldProceedOnDefeat: boolean
  preGameDialog?: DialogLine[]
  cpuConfig: InitialUnitConfig[]
  playerConfig: InitialUnitConfig[]
  camPosition: {
    row: number
    col: number
  }
  tileMapKey: string
}

export enum GameOverConditions {
  PLAYER_WIN = 'PLAYER_WIN',
  CPU_WIN = 'CPU_WIN',
  IN_PROGRESS = 'IN_PROGRESS',
}

export default class Game extends Phaser.Scene {
  public tileMap!: Phaser.Tilemaps.Tilemap
  public grid!: Grid
  public player!: Player
  public cpu!: CPU
  public cameraPanEvent: Phaser.Time.TimerEvent | null = null
  public currTurn: Side = Side.PLAYER
  public static instance: Game

  private playerConfig!: InitialUnitConfig[]
  private cpuConfig!: InitialUnitConfig[]
  private tileMapKey!: string
  private initialCamPosition!: {
    row: number
    col: number
  }
  public shouldHideCursor: boolean = false
  public shouldProceedOnDefeat: boolean = false
  public preGameDialogLines: DialogLine[] | null = null

  constructor() {
    super('game')
    Game.instance = this
  }

  create() {
    this.initScale()
    createSlashAnims(this.anims)
    this.initTilemap()
    this.initGrid()
    this.initPlayer()
    this.initCPU()
    this.initCamera()
    this.handlePreGameDialogLines()
  }

  init(data: GameConfig) {
    const {
      cpuConfig,
      playerConfig,
      tileMapKey,
      camPosition,
      preGameDialog,
      shouldProceedOnDefeat,
    } = data
    this.cpuConfig = cpuConfig
    this.playerConfig = playerConfig
    this.tileMapKey = tileMapKey
    this.initialCamPosition = camPosition
    this.shouldProceedOnDefeat = shouldProceedOnDefeat
    if (preGameDialog) {
      this.preGameDialogLines = preGameDialog
    }
  }

  handlePreGameDialogLines() {
    if (this.preGameDialogLines) {
      this.player.hideCursor()
      this.scene.bringToTop('cutscene-overlay')
      this.player.freezeCursor()
      this.player.shouldShowUnitStats = false
      CutsceneOverlay.instance.setDialogLines(this.preGameDialogLines)
      CutsceneOverlay.instance.setOnDialogFinishedCallback(() => {
        this.player.showCursor()
        this.player.unfreezeCursor()
        this.player.shouldShowUnitStats = true
      })
      this.time.delayedCall(500, () => {
        CutsceneOverlay.instance.showNextDialogLine()
      })
    }
  }

  initScale() {
    this.game.scale.resize(GameConstants.WINDOW_WIDTH, GameConstants.WINDOW_HEIGHT)
    this.game.scale.setZoom(GameConstants.GAME_ZOOM_FACTOR)
  }

  initCamera() {
    let camCenterRow = 12
    let camCenterCol = 12
    if (this.initialCamPosition) {
      camCenterRow = this.initialCamPosition.row
      camCenterCol = this.initialCamPosition.col
    }
    const cell = this.grid.getCellAtRowCol(camCenterRow, camCenterCol)
    this.cameras.main.setBounds(0, 0, GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT)
    this.cameras.main.centerOn(cell.centerX, cell.centerY)
  }

  getAllLivingUnits() {
    const livingPlayerUnits = this.player.getLivingUnits()
    const livingCPUUnits = this.cpu.getLivingUnits()
    return livingPlayerUnits.concat(livingCPUUnits)
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
    this.player = new Player(this, this.playerConfig)
  }

  initCPU() {
    this.cpu = new CPU(this, this.cpuConfig)
  }

  initTilemap() {
    this.tileMap = this.make.tilemap({
      key: this.tileMapKey,
    })
    const tileset = this.tileMap.addTilesetImage('tilemap_packed', 'tilemap_packed')
    this.createLayer('Ground', tileset)
    this.createLayer('Walls', tileset)
  }

  createLayer(layerName: string, tileset: Phaser.Tilemaps.Tileset) {
    this.tileMap.createLayer(layerName, tileset)
  }

  unitAtPosition(row: number, col: number, currUnit: Unit) {
    const allUnits = this.getAllLivingUnits()
    for (let i = 0; i < allUnits.length; i++) {
      const unit = allUnits[i]
      const rowCol = unit.getRowCol()
      if (rowCol.row === row && rowCol.col === col && currUnit !== unit) {
        return true
      }
    }
    return false
  }

  handleGameOverCondition(gameOverCondition: GameOverConditions) {
    this.resetAfterSceneEnd()
    GameUI.instance.hideUnitStats()
    GameUI.instance.hideTransitionUI()
    GameUI.instance.showGameOverUI(gameOverCondition, () => {
      if (gameOverCondition === GameOverConditions.PLAYER_WIN || this.shouldProceedOnDefeat) {
        SceneController.instance.onSceneCompleted()
      } else {
        SceneController.instance.restartCurrentLevel()
      }
    })
  }

  resetAfterSceneEnd() {
    this.player.cursor.show()
    this.currTurn = Side.PLAYER
    GameUI.instance.configureAttackAnimationModal(AttackDirection.LEFT)
  }

  getGameOverCondition() {
    const playerLivingUnits = this.player.getLivingUnits()
    const cpuLivingUnits = this.cpu.getLivingUnits()
    if (playerLivingUnits.length === 0) {
      return GameOverConditions.CPU_WIN
    } else if (cpuLivingUnits.length === 0) {
      return GameOverConditions.PLAYER_WIN
    } else {
      return GameOverConditions.IN_PROGRESS
    }
  }

  setTurn(side: Side) {
    this.currTurn = side
    GameUI.instance.transitionTurn(() => {
      if (side === Side.CPU) {
        this.cpu.startTurn()
      } else if (side === Side.PLAYER) {
        this.player.startTurn()
      }
    })
  }

  panCameraIfNecessary(targetRow: number, targetCol: number) {
    const camera = this.cameras.main
    const cell = this.grid.getCellAtRowCol(targetRow, targetCol)

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
