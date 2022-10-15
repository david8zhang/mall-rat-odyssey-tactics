import Phaser from 'phaser'
import { createSlashAnims } from '~/core/anims/createSlashAnims'
import { CPU } from '~/core/CPU'
import { Grid } from '~/core/Grid'
import { Player } from '~/core/Player'
import { Unit } from '~/core/units/Unit'
import { Direction } from '~/utils/Directions'
import { GameConstants } from '~/scenes/game/GameConstants'
import { Side } from '~/utils/Side'
import { UnitTypes } from '~/core/units/UnitConstants'
import { SceneController } from '../SceneController'
import { AttackDirection, GameUI } from './GameUI'

export interface InitialUnitConfig {
  rowColPos: number[]
  texture: string
  name: string
  moveRange: number
  attackRange: number
  maxHealth: number
  unitType: UnitTypes
}

export interface GameConfig {
  cpuConfig: InitialUnitConfig[]
  playerConfig: InitialUnitConfig[]
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
  private static _instance: Game

  private playerConfig!: InitialUnitConfig[]
  private cpuConfig!: InitialUnitConfig[]

  constructor() {
    super('game')
    Game._instance = this
  }

  public static get instance() {
    return Game._instance
  }

  create() {
    this.initScale()
    createSlashAnims(this.anims)
    this.initCamera()
    this.initTilemap()
    this.initGrid()
    this.initPlayer()
    this.initCPU()
  }

  init(data: GameConfig) {
    const { cpuConfig, playerConfig } = data
    this.cpuConfig = cpuConfig
    this.playerConfig = playerConfig
  }

  initScale() {
    this.game.scale.resize(GameConstants.WINDOW_WIDTH, GameConstants.WINDOW_HEIGHT)
    this.game.scale.setZoom(GameConstants.GAME_ZOOM_FACTOR)
  }

  initCamera() {
    this.cameras.main.setBounds(0, 0, GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT)
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
      key: 'sample-map',
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
      if (gameOverCondition === GameOverConditions.PLAYER_WIN) {
        SceneController.instance.onSceneCompleted()
      } else {
        SceneController.instance.restartCurrentLevel()
      }
    })
  }

  resetAfterSceneEnd() {
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
}
