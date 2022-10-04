import { Scene } from 'phaser'
import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox'
import { Dialog } from '~/scenes/Dialog'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

export interface SpeechBoxConfig {
  wrapWidth: number
  fixedWidth: number
  fixedHeight: number
  x: number
  y: number
  onFinishedTypingCb: Function
  rexUI: RexUIPlugin
  fontSize: string
  space?: {
    left: number
    right: number
    top: number
    bottom: number
    icon: number
    text: number
  }
  speechBoxRadius?: number
}

export class SpeechBox {
  private static readonly DEFAULT_SPACE_CONFIG = {
    left: 30,
    right: 5,
    top: 10,
    bottom: 25,
    icon: 10,
    text: 10,
  }

  private scene: Scene
  private config: SpeechBoxConfig
  private textBox: TextBox

  public static COLOR_PRIMARY = 0x000000
  public static COLOR_LIGHT = 0xffffff

  public isActive: boolean = true
  public onFinishedTypingCb: Function
  public rexUI: RexUIPlugin

  constructor(scene: Scene, config: SpeechBoxConfig) {
    this.scene = scene
    this.config = config
    this.onFinishedTypingCb = config.onFinishedTypingCb
    this.rexUI = config.rexUI
    const { x, y } = config
    this.textBox = this.rexUI.add
      .textBox({
        x,
        y,
        background: this.createSpeechBubbleShape(SpeechBox.COLOR_PRIMARY, SpeechBox.COLOR_LIGHT),
        text: this.getBBCodeText(),
        action: this.scene.add
          .image(0, 0, 'nextPage')
          .setTint(SpeechBox.COLOR_LIGHT)
          .setVisible(false),
        space: this.config.space ? this.config.space : SpeechBox.DEFAULT_SPACE_CONFIG,
      })
      .setOrigin(0, 1)
      .layout()
      .setDepth(1000)

    const icon = this.textBox.getElement('action') as any
    icon.setVisible(false)

    this.textBox.setInteractive().on('pointerdown', () => {
      if (this.isActive) {
        if (this.textBox.isTyping) {
          this.textBox.stop(true)
        } else {
          if (this.textBox.isLastPage) {
            this.onFinishedTypingCb()
          } else {
            this.textBox.typeNextPage()
          }
        }
      }
    })
  }

  setVisible(isVisible: boolean) {
    this.textBox.setVisible(isVisible)
    this.isActive = isVisible
  }

  displayText(content: string, typingSpeed: number) {
    this.setVisible(true)
    this.textBox.start(content, typingSpeed)
  }

  getBBCodeText() {
    const { wrapWidth, fixedWidth, fixedHeight, fontSize } = this.config
    return this.rexUI.add
      .BBCodeText(0, 0, '', {
        fixedWidth,
        fixedHeight,
        fontSize,
        wrap: {
          mode: 'word',
          width: wrapWidth,
        },
        maxLines: 3,
      })
      .setDepth(1000)
  }

  setPosition(x: number, y: number) {
    this.textBox.setPosition(x, y)
  }

  getBuiltInText() {
    const { wrapWidth, fixedWidth, fixedHeight } = this.config
    return this.scene.add
      .text(0, 0, '', {
        fontSize: '12px',
        wordWrap: {
          width: wrapWidth,
        },
        maxLines: 3,
      })
      .setFixedSize(fixedWidth, fixedHeight)
  }

  createSpeechBubbleShape(fillColor, strokeColor) {
    const radius = this.config.speechBoxRadius ? this.config.speechBoxRadius : 20
    const indent = 10
    return this.rexUI.add.customShapes({
      create: { lines: 1 },
      update: function () {
        var left = 0,
          right = this.width,
          top = 0,
          bottom = this.height,
          boxBottom = bottom - indent

        const shape: any = this.getShapes()[0]
        shape
          .lineStyle(2, strokeColor, 1)
          .fillStyle(fillColor, 1)
          // top line, right arc
          .startAt(left + radius, top)
          .lineTo(right - radius, top)
          .arc(right - radius, top + radius, radius, 270, 360)
          // right line, bottom arc
          .lineTo(right, boxBottom - radius)
          .arc(right - radius, boxBottom - radius, radius, 0, 90)
          .lineTo(left + radius, boxBottom)
          .arc(left + radius, boxBottom - radius, radius, 90, 180)
          // left line, top arc
          .lineTo(left, top + radius)
          .arc(left + radius, top + radius, radius, 180, 270)
          .close()
      },
    })
  }
}
