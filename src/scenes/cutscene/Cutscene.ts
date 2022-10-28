import { Grid } from '~/core/Grid'
import { CutsceneCharacterConfig, CutsceneStateTypes } from '~/scenes/cutscene/CutsceneConstants'
import { GameConstants } from '~/scenes/game/GameConstants'
import { SceneController } from '../SceneController'
import { AnimateSpriteState } from './states/AnimateSpriteState'
import { CharacterMoveState } from './states/CharacterMoveState'
import { CutsceneState } from './states/CutsceneState'
import { DialogState } from './states/DialogState'
import { ScreenEffectState } from './states/ScreenEffectState'
import { TransitionState } from './states/TransitionState'

export interface CutsceneConfig {
  initialState: {
    characterConfigs: {
      [id: string]: CutsceneCharacterConfig
    }
  }
  states: {
    type: CutsceneStateTypes
    config: any
  }[]
}

export class Cutscene extends Phaser.Scene {
  private tileMap!: Phaser.Tilemaps.Tilemap
  public grid!: Grid
  private cutsceneConfig!: CutsceneConfig
  public currStateIndex: number = 0
  public canGoToNextState: boolean = true

  // Arrangement of character sprites on the screen
  public characterSpriteMapping: {
    [id: string]: Phaser.GameObjects.Sprite
  } = {}
  public stateHandlers!: {
    [key in CutsceneStateTypes]: CutsceneState
  }

  public static instance: Cutscene

  constructor() {
    super('cutscene')
    Cutscene.instance = this
  }

  init(data: CutsceneConfig) {
    this.currStateIndex = 0
    this.cutsceneConfig = data
  }

  initScale() {
    this.game.scale.resize(GameConstants.WINDOW_WIDTH, GameConstants.WINDOW_HEIGHT)
    this.game.scale.setZoom(GameConstants.GAME_ZOOM_FACTOR)
  }

  initTilemap() {
    this.tileMap = this.make.tilemap({
      key: 'cutscene-map',
    })
    const tileset = this.tileMap.addTilesetImage('tilemap_packed', 'tilemap_packed')
    this.createLayer('Ground', tileset)
  }

  initMouseClickListener() {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.goToNextState()
    })
  }

  initGrid() {
    this.grid = new Grid(this, {
      width: GameConstants.GAME_WIDTH,
      height: GameConstants.GAME_HEIGHT,
      cellSize: GameConstants.TILE_SIZE,
    })
    this.grid.showGrid()
  }

  create() {
    this.stateHandlers = {
      [CutsceneStateTypes.CHARACTER_MOVEMENT]: new CharacterMoveState(this),
      [CutsceneStateTypes.DIALOG]: new DialogState(this),
      [CutsceneStateTypes.CHARACTER_ANIM]: new AnimateSpriteState(this),
      [CutsceneStateTypes.SCREEN_EFFECT]: new ScreenEffectState(this),
      [CutsceneStateTypes.TRANSITION]: new TransitionState(this),
    }
    this.initScale()
    this.initTilemap()
    this.initGrid()
    this.initMouseClickListener()
    this.initCameraBounds()
    this.initCutsceneState(this.cutsceneConfig.initialState)
    this.initDebugKeyListener()
  }

  initDebugKeyListener() {
    this.input.keyboard.on('keydown', (e) => {
      if (e.code === 'Period') {
        Object.keys(this.characterSpriteMapping).forEach((key) => {
          const sprite = this.characterSpriteMapping[key]
          const cell = this.grid.getCellAtWorldPosition(sprite.x, sprite.y)
          console.log(`${key}: ${cell.gridRow}, ${cell.gridCol}`)
        })
      }
      if (e.code === 'KeyM') {
        console.log('Skipping!')
        this.cleanupCutscene()
        SceneController.instance.onSceneCompleted()
        return
      }
    })
  }

  initCameraBounds() {
    this.cameras.main.setBounds(0, 0, GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT)
    this.cameras.main.centerOn(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2)
  }

  public initCutsceneState(initialState: {
    characterConfigs: {
      [key: string]: CutsceneCharacterConfig
    }
    camPosition?: { row: number; col: number }
  }) {
    let cell = this.grid.getCellAtRowCol(12, 12)
    if (initialState.camPosition) {
      cell = this.grid.getCellAtRowCol(initialState.camPosition.row, initialState.camPosition.col)
    }
    this.cameras.main.centerOn(cell.centerX, cell.centerY)
    Object.keys(initialState.characterConfigs).map((characterId: string) => {
      const characterConfig = initialState.characterConfigs[characterId]
      let boundRow = characterConfig.row
      let boundCol = characterConfig.col
      if (boundRow < 0) {
        boundRow = 0
      } else if (boundRow >= this.grid.numRows) {
        boundRow = this.grid.numRows - 1
      }
      if (boundCol < 0) {
        boundCol = 0
      } else if (boundCol >= this.grid.numCols) {
        boundCol = this.grid.numCols - 1
      }
      const cell = this.grid.getCellAtRowCol(boundRow, boundCol)
      const characterSprite = this.add.sprite(
        cell.centerX,
        cell.centerY,
        characterConfig.texture as string
      )
      if (characterConfig.camFocus) {
        this.cameras.main.startFollow(characterSprite)
      }
      this.characterSpriteMapping[characterId] = characterSprite
    })
  }

  resetCharacterConfigs() {
    Object.keys(this.characterSpriteMapping).forEach((key: string) => {
      this.characterSpriteMapping[key].destroy()
    })
    this.characterSpriteMapping = {}
  }

  createLayer(layerName: string, tileset: Phaser.Tilemaps.Tileset) {
    this.tileMap.createLayer(layerName, tileset)
  }

  isLastState() {
    return this.currStateIndex == this.cutsceneConfig.states.length
  }

  cleanupCutscene() {
    this.resetCharacterConfigs()
  }

  // On each tick of the clock, go to the next state of the cutscene and move each character accordingly
  goToNextState() {
    if (!this.canGoToNextState) {
      return
    }
    if (this.isLastState()) {
      this.cleanupCutscene()
      SceneController.instance.onSceneCompleted()
      return
    }
    const currState = this.cutsceneConfig.states[this.currStateIndex]
    const handler = this.stateHandlers[currState.type]
    handler.processState(() => {
      this.currStateIndex++
    }, currState.config)
  }
}
