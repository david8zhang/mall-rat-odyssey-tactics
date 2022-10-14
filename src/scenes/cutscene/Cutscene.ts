import { Grid } from '~/core/Grid'
import { CutsceneCharacterConfig, CutsceneStateTypes } from '~/utils/CutsceneConstants'
import { GameConstants } from '~/utils/GameConstants'
import { SceneController } from '../SceneController'
import { CharacterMoveState } from './states/CharacterMoveState'
import { CutsceneState } from './states/CutsceneState'
import { DialogState } from './states/DialogState'

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

  constructor() {
    super('cutscene')
  }

  init(data: CutsceneConfig) {
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
    }
    this.initScale()
    this.initTilemap()
    this.initGrid()
    this.initMouseClickListener()
    this.initCutsceneState()
    this.initCameraBounds()
  }

  initCameraBounds() {
    this.cameras.main.setBounds(0, 0, GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT)
  }

  initCutsceneState() {
    const { initialState } = this.cutsceneConfig
    Object.keys(initialState.characterConfigs).map((characterId: string) => {
      const characterConfig = initialState.characterConfigs[characterId]
      const cell = this.grid.getCellAtRowCol(characterConfig.row, characterConfig.col)
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

  createLayer(layerName: string, tileset: Phaser.Tilemaps.Tileset) {
    this.tileMap.createLayer(layerName, tileset)
  }

  isLastState() {
    return this.currStateIndex == this.cutsceneConfig.states.length
  }

  // On each tick of the clock, go to the next state of the cutscene and move each character accordingly
  goToNextState() {
    if (!this.canGoToNextState) {
      return
    }
    if (this.isLastState()) {
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
