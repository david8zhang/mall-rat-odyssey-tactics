import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { Grid } from '~/core/Grid'
import { SpeechBox } from '~/core/ui/SpeechBox'
import { GameConstants } from '~/utils/GameConstants'
import { DialogLine } from './Dialog'

export interface CutsceneCharacterConfig {
  row: number
  col: number
  texture?: string
  camFocus?: boolean
}

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
  private static readonly SPEECH_BOX_WIDTH = GameConstants.WINDOW_WIDTH - 120
  private static readonly SPEECH_BOX_HEIGHT = 25
  private static readonly DEFAULT_TYPING_SPEED = 50

  private tileMap!: Phaser.Tilemaps.Tilemap
  private grid!: Grid
  private cutsceneConfig!: CutsceneConfig
  public currStateIndex: number = 0
  public characterSpriteMapping: {
    [id: string]: Phaser.GameObjects.Sprite
  } = {}
  public isPlayingState: boolean = false

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
    this.initDialogBox()
    this.initMouseClickListener()
    this.initCutsceneState()
    this.initCameraBounds()
    this.initDialogBox()
  }

  initDialogBox() {
    this.speechBox = new SpeechBox(this, {
      fixedHeight: Cutscene.SPEECH_BOX_HEIGHT,
      fixedWidth: Cutscene.SPEECH_BOX_WIDTH,
      wrapWidth: Cutscene.SPEECH_BOX_WIDTH,
      x: 20,
      y: GameConstants.WINDOW_HEIGHT,
      fontSize: '12px',
      speechBoxRadius: 10,
      space: {
        left: 30,
        right: 5,
        top: 10,
        bottom: 25,
        icon: 10,
        text: 10,
      },
      onFinishedTypingCb: () => {
        // if (this.dialogLineIndex === this.dialogConfig.dialogLines.length - 1) {
        //   this.scene.start('game')
        //   this.scene.start('ui')
        // } else {
        //   this.dialogLineIndex++
        //   this.dialogLineIndex = Math.min(
        //     this.dialogConfig.dialogLines.length - 1,
        //     this.dialogLineIndex
        //   )
        //   this.showNextDialogLine()
        // }
      },
      rexUI: this.rexUI,
    })
  }

  onFinishedTyping() {}

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

  // On each tick of the clock, go to the next state of the cutscene and move each character accordingly
  goToNextState() {
    const nextState = this.cutsceneConfig.newStates[this.currStateIndex]
    if (
      this.currStateIndex == this.cutsceneConfig.newStates.length ||
      this.isPlayingState ||
      !nextState
    ) {
      return
    }
    this.isPlayingState = true
    const prevState =
      this.currStateIndex === 0
        ? this.cutsceneConfig.initialState
        : this.cutsceneConfig.newStates[this.currStateIndex - 1]
    this.handleCharacterMovement(prevState, nextState)
  }

  handleCharacterMovement(prevState: any, nextState: any) {
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
            this.isPlayingState = false
            this.currStateIndex++
            if (nextState.dialogLines) {
              this.handleDialog(nextState)
            }
          }
        }
      )
    })
  }

  handleDialog(nextState: any) {
    const { dialogLines } = nextState
    const dialogLineToShow = dialogLines[this.dialogLineIndex]
    console.log('Went here!')
    this.speechBox.displayText(dialogLineToShow.text, 50)
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
