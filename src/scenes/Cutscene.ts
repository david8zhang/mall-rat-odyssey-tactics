import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { Grid } from '~/core/Grid'
import { SpeechBox } from '~/core/ui/SpeechBox'
import { GameConstants } from '~/utils/GameConstants'
import { CutsceneCharacterConfig, DialogLine } from '~/utils/LevelConfig'
import { CutsceneOverlay } from './CutsceneOverlay'
import { SceneController } from './SceneController'

export interface CutsceneConfig {
  initialState: {
    characterConfigs: {
      [id: string]: CutsceneCharacterConfig
    }
  }
  newStates: {
    characterConfigs: {
      [id: string]: CutsceneCharacterConfig
    }
    dialogLines?: DialogLine[]
  }[]
}

export class Cutscene extends Phaser.Scene {
  private tileMap!: Phaser.Tilemaps.Tilemap
  private grid!: Grid
  private cutsceneConfig!: CutsceneConfig
  public currStateIndex: number = 0
  public characterSpriteMapping: {
    [id: string]: Phaser.GameObjects.Sprite
  } = {}
  public isPlayingCharacterMovement: boolean = false
  public isPlayingDialog: boolean = false

  // Speechbox
  public rexUI!: RexUIPlugin
  private speechBox!: SpeechBox
  public dialogLineIndex: number = 0

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

  canGoToNextState() {
    const nextState = this.cutsceneConfig.newStates[this.currStateIndex]
    return !this.isPlayingCharacterMovement && !this.isPlayingDialog && nextState
  }

  isLastState() {
    return this.currStateIndex >= this.cutsceneConfig.newStates.length
  }

  // On each tick of the clock, go to the next state of the cutscene and move each character accordingly
  goToNextState() {
    if (this.isLastState()) {
      SceneController.instance.onSceneCompleted()
      return
    }
    const canGoToNextState = this.canGoToNextState()
    if (!canGoToNextState) {
      return
    }
    this.isPlayingCharacterMovement = true
    const prevState =
      this.currStateIndex === 0
        ? this.cutsceneConfig.initialState
        : this.cutsceneConfig.newStates[this.currStateIndex - 1]
    const nextState = this.cutsceneConfig.newStates[this.currStateIndex]
    this.handleCharacterMovement(prevState, nextState, () => {
      this.handleDialog(nextState)
    })
  }

  handleCharacterMovement(prevState: any, nextState: any, onCompleteCallback: Function) {
    const characterConfigKeys = Object.keys(nextState.characterConfigs)
    characterConfigKeys.forEach((key: string, index: number) => {
      const prevCharacterState = prevState.characterConfigs[key]
      const currCharacterState = nextState.characterConfigs[key]
      this.moveToNewCell(
        prevCharacterState,
        currCharacterState,
        this.characterSpriteMapping[key],
        () => {
          if (index === characterConfigKeys.length - 1) {
            this.isPlayingCharacterMovement = false
            this.currStateIndex++
            if (nextState.dialogLines) {
              onCompleteCallback()
            }
          }
        }
      )
    })
  }

  handleDialog(nextState: any) {
    const { dialogLines } = nextState
    if (dialogLines && dialogLines.length > 0) {
      this.isPlayingDialog = true
      CutsceneOverlay.instance.setDialogLines(dialogLines)
      CutsceneOverlay.instance.setOnDialogFinishedCallback(() => {
        this.isPlayingDialog = false
      })
      CutsceneOverlay.instance.showNextDialogLine()
    }
  }

  moveToNewCell(
    prevCharacterState,
    currCharacterState,
    spriteTarget: Phaser.GameObjects.Sprite,
    onCompleteCb: Function
  ) {
    // Travel from old cell to new cell (horizontally, then vertically)
    const prevCell = this.grid.getCellAtRowCol(prevCharacterState.row, prevCharacterState.col)
    const newCellHoriz = this.grid.getCellAtRowCol(currCharacterState.row, prevCharacterState.col)
    const timeDuration = Math.abs(currCharacterState.row - prevCharacterState.row) * 100
    this.tweens.add({
      targets: spriteTarget,
      x: { from: prevCell.centerX, to: newCellHoriz.centerX },
      y: { from: prevCell.centerY, to: newCellHoriz.centerY },
      duration: timeDuration,
      onComplete: () => {
        const newCellVert = this.grid.getCellAtRowCol(
          currCharacterState.row,
          currCharacterState.col
        )
        const timeDuration = Math.abs(currCharacterState.col - prevCharacterState.col) * 100
        this.tweens.add({
          targets: spriteTarget,
          x: { from: newCellHoriz.centerX, to: newCellVert.centerX },
          y: { from: newCellHoriz.centerY, to: newCellVert.centerY },
          duration: timeDuration,
          onComplete: () => {
            onCompleteCb()
          },
        })
      },
    })
  }
}
