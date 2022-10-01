import { Scale } from 'phaser'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { SpeechBox } from '~/core/ui/DialogSpeechBox'
import { GameConstants } from '~/utils/GameConstants'

export interface DialogConfig {
  speakerTexture: string
  spriteConfig?: {
    scale: number
  }
  dialogLines: {
    text: string
    img: string
  }[]
}

export class Dialog extends Phaser.Scene {
  private static readonly DIALOG_WINDOW_WIDTH = GameConstants.WINDOW_WIDTH * 3
  private static readonly DIALOG_WINDOW_HEIGHT = GameConstants.WINDOW_HEIGHT * 3

  private static readonly SPEECH_BOX_WIDTH = Dialog.DIALOG_WINDOW_WIDTH - 120
  private static readonly SPEECH_BOX_HEIGHT = 75
  private static readonly DEFAULT_TYPING_SPEED = 50

  private dialogConfig!: DialogConfig
  public rexUI!: RexUIPlugin
  public speechBox!: SpeechBox
  public dialogLineIndex: number = 0
  public speakerSprite!: Phaser.GameObjects.Sprite

  constructor() {
    super('dialog')
  }

  init(data: DialogConfig) {
    this.dialogConfig = data
  }

  create() {
    this.game.scale.resize(Dialog.DIALOG_WINDOW_WIDTH, Dialog.DIALOG_WINDOW_HEIGHT)
    this.initDialogUI()
    this.showNextDialogLine()
  }

  initDialogUI() {
    this.speechBox = new SpeechBox(this, {
      fixedHeight: Dialog.SPEECH_BOX_HEIGHT,
      fixedWidth: Dialog.SPEECH_BOX_WIDTH,
      wrapWidth: Dialog.SPEECH_BOX_WIDTH,
      x: 20,
      y: Dialog.DIALOG_WINDOW_HEIGHT,
      onFinishedTypingCb: () => {
        if (this.dialogLineIndex === this.dialogConfig.dialogLines.length - 1) {
          this.scene.start('game')
          this.scene.start('ui')
        } else {
          this.dialogLineIndex++
          this.dialogLineIndex = Math.min(
            this.dialogConfig.dialogLines.length - 1,
            this.dialogLineIndex
          )
          this.showNextDialogLine()
        }
      },
    })
    this.speakerSprite = this.add.sprite(
      Dialog.DIALOG_WINDOW_WIDTH / 2,
      Dialog.DIALOG_WINDOW_HEIGHT / 2,
      this.dialogConfig.speakerTexture
    )
    if (this.dialogConfig.spriteConfig) {
      this.speakerSprite.setScale(this.dialogConfig.spriteConfig.scale)
    }
  }

  showNextDialogLine() {
    const currDialogLine = this.dialogConfig.dialogLines[this.dialogLineIndex]
    this.speechBox.displayText(currDialogLine.text, Dialog.DEFAULT_TYPING_SPEED)
  }
}
