import { Button } from '~/core/ui/Button'
import { GameConstants } from './game/GameConstants'

export class Start extends Phaser.Scene {
  private numAnimatedRats: number = 150
  private titleText!: Phaser.GameObjects.Text
  private subtitleText!: Phaser.GameObjects.Text

  constructor() {
    super('start')
  }

  tweenSpriteAcrossScreen(sprite: Phaser.GameObjects.Sprite, initialDelay: number) {
    const randX = Phaser.Math.Between(0, GameConstants.WINDOW_WIDTH)
    const randColor = Math.floor(Math.random() * 16777215).toString(16)
    sprite.setPosition(randX, -20)
    sprite.setTint(parseInt(randColor, 16))
    sprite.setVisible(true)
    this.tweens.add({
      delay: initialDelay,
      targets: [sprite],
      y: {
        from: 0,
        to: GameConstants.WINDOW_HEIGHT + 10,
      },
      duration: Phaser.Math.Between(2000, 5000),
      onComplete: () => {
        this.tweenSpriteAcrossScreen(sprite, 0)
      },
    })
  }

  generateRandomRatSprites() {
    const sprites: Phaser.GameObjects.Sprite[] = []
    for (let i = 0; i < this.numAnimatedRats; i++) {
      const newSprite = this.add.sprite(0, 0, 'rat1').setVisible(false)
      sprites.push(newSprite)
    }
    sprites.forEach((s) => {
      this.tweenSpriteAcrossScreen(s, Phaser.Math.Between(0, 2500))
    })
  }

  initTitleText() {
    this.titleText = this.add
      .text(GameConstants.WINDOW_WIDTH / 2, GameConstants.WINDOW_HEIGHT / 8, 'Mall Rat Odyssey')
      .setFontSize(30)
      .setStroke('#222', 8)
      .setPadding(2)
      .setDepth(1000)
      .setFontFamily('Retron')
    this.titleText.setPosition(
      GameConstants.WINDOW_WIDTH / 2 - this.titleText.displayWidth / 2,
      GameConstants.WINDOW_HEIGHT / 8
    )
    this.subtitleText = this.add
      .text(GameConstants.WINDOW_WIDTH / 2, this.titleText.y + 20, 'TACTICS')
      .setFontSize(50)
      .setStroke('#222', 10)
      .setDepth(1000)
      .setFontFamily('Retron')
    this.subtitleText.setPosition(
      GameConstants.WINDOW_WIDTH / 2 - this.subtitleText.displayWidth / 2,
      this.titleText.y + this.titleText.displayHeight - 10
    )
  }

  initCamera() {
    this.game.scale.resize(GameConstants.WINDOW_WIDTH, GameConstants.WINDOW_HEIGHT)
    this.game.scale.setZoom(GameConstants.GAME_ZOOM_FACTOR)
    this.cameras.main.setBackgroundColor(0xeaa56c)
  }

  initButton() {
    const button = new Button(this, {
      width: 50,
      height: 25,
      onPress: () => {
        this.scene.start('scene-controller')
      },
      text: 'Play',
      position: {
        x: this.subtitleText.x + this.subtitleText.displayWidth / 2,
        y: this.subtitleText.y + this.subtitleText.displayHeight + 20,
      },
    })
  }

  initSplashSprites() {
    const sprite1 = this.add
      .sprite(GameConstants.WINDOW_WIDTH * 0.5 - 40, GameConstants.WINDOW_HEIGHT * 0.5 + 60, 'rat1')
      .setScale(4)
    const sprite2 = this.add
      .sprite(GameConstants.WINDOW_WIDTH * 0.5 + 40, GameConstants.WINDOW_HEIGHT * 0.5 + 60, 'rat2')
      .setFlipX(true)
      .setScale(4)
  }

  create() {
    this.generateRandomRatSprites()
    this.initCamera()
    this.initTitleText()
    // this.initSplashSprites()
    this.initButton()
  }
}
