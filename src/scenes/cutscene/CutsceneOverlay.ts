import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { SpeechBox } from '~/core/ui/SpeechBox'
import { DialogLine, SpeakerPosition } from '~/scenes/dialog/DialogConstants'
import { GameConstants } from '~/scenes/game/GameConstants'
import { Cutscene } from './Cutscene'

export class CutsceneOverlay extends Phaser.Scene {
  private static readonly SPEECH_BOX_WIDTH = GameConstants.WINDOW_WIDTH - 120
  private static readonly SPEECH_BOX_HEIGHT = 25

  public rexUI!: RexUIPlugin
  private speechBox!: SpeechBox
  public dialogLineIndex: number = 0
  public dialogLines: DialogLine[] = []
  public onDialogFinishedCallback: Function | null = null
  public speakerSprite!: Phaser.GameObjects.Sprite

  public static instance: CutsceneOverlay

  constructor() {
    super('cutscene-overlay')
    CutsceneOverlay.instance = this
  }

  initScale() {
    this.game.scale.resize(GameConstants.WINDOW_WIDTH, GameConstants.WINDOW_HEIGHT)
    this.game.scale.setZoom(GameConstants.GAME_ZOOM_FACTOR)
  }

  initDialogBox() {
    this.speechBox = new SpeechBox(this, {
      fixedHeight: CutsceneOverlay.SPEECH_BOX_HEIGHT,
      fixedWidth: CutsceneOverlay.SPEECH_BOX_WIDTH,
      wrapWidth: CutsceneOverlay.SPEECH_BOX_WIDTH,
      x: 20,
      y: GameConstants.WINDOW_HEIGHT,
      fontSize: '12px',
      speechBoxRadius: 10,
      maxLines: 2,
      space: {
        left: 30,
        right: 5,
        top: 10,
        bottom: 25,
        icon: 10,
        text: 10,
      },
      onFinishedTypingCb: () => {
        if (this.dialogLineIndex === this.dialogLines.length - 1) {
          if (this.onDialogFinishedCallback) {
            this.onDialogFinishedCallback()
            this.speechBox.setVisible(false)
            this.speakerSprite.setVisible(false)
          }
        } else {
          this.dialogLineIndex++
          this.dialogLineIndex = Math.min(this.dialogLines.length - 1, this.dialogLineIndex)
          this.showNextDialogLine()
        }
      },
      rexUI: this.rexUI,
    })
    this.speechBox.setVisible(false)
  }

  initSpeakerSprite() {
    this.speakerSprite = this.add
      .sprite(10, GameConstants.WINDOW_HEIGHT / 2 + 50, '')
      .setVisible(false)
  }

  create() {
    this.initScale()
    this.initDialogBox()
    this.initSpeakerSprite()
  }

  setOnDialogFinishedCallback(onDialogFinishedCallback: Function) {
    this.onDialogFinishedCallback = onDialogFinishedCallback
  }

  setDialogLines(dialogLines: DialogLine[]) {
    this.dialogLines = dialogLines
    this.dialogLineIndex = 0
  }

  showNextDialogLine() {
    const nextDialogLine = this.dialogLines[this.dialogLineIndex]
    const { spriteConfig, screenShakeConfig } = nextDialogLine
    if (spriteConfig) {
      const texture = spriteConfig.texture
        ? spriteConfig.texture
        : Cutscene.instance.characterSpriteMapping[spriteConfig.charKey!].texture.key
      const scale = spriteConfig.scale ? spriteConfig.scale : 1
      this.speakerSprite.setTexture(texture).setScale(scale).setVisible(true).setDepth(10)
      if (spriteConfig.position === SpeakerPosition.LEFT) {
        this.speakerSprite.setPosition(
          20 + this.speakerSprite.displayWidth / 2,
          GameConstants.WINDOW_HEIGHT / 2 + 25
        )
      } else {
        this.speakerSprite.setPosition(
          GameConstants.WINDOW_WIDTH - 20 - this.speakerSprite.displayWidth / 2,
          GameConstants.WINDOW_HEIGHT / 2 + 25
        )
      }
    }
    if (screenShakeConfig) {
      Cutscene.instance.cameras.main.shake(screenShakeConfig.duration, screenShakeConfig.intensity)
    }
    this.speechBox.setVisible(true)
    this.speechBox.displayText(nextDialogLine.text, 50)
  }
}
