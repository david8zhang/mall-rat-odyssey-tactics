import { UIValueBar } from '~/core/ui/UIValueBar'
import { Unit } from '~/core/Unit'
import { Direction } from '~/utils/Directions'
import { GameConstants } from '~/utils/GameConstants'
import { Side } from '~/utils/Side'
import Game from './Game'

export class UI extends Phaser.Scene {
  public static readonly SCROLL_RECT_HEIGHT = 192
  public static readonly SCROLL_RECT_WIDTH = 32
  private static _instance: UI

  public isScrollingCamera: boolean = false

  public leftCamScrollRect!: Phaser.GameObjects.Rectangle
  public rightCamScrollRect!: Phaser.GameObjects.Rectangle
  public upCamScrollRect!: Phaser.GameObjects.Rectangle
  public downCamScrollRect!: Phaser.GameObjects.Rectangle

  public transitionText!: Phaser.GameObjects.Text
  public transitionRect!: Phaser.GameObjects.Rectangle

  public attackModal!: Phaser.GameObjects.Rectangle
  public attackerSprite!: Phaser.GameObjects.Sprite
  public defenderSprite!: Phaser.GameObjects.Sprite

  public unitStatsSprite!: Phaser.GameObjects.Sprite
  public unitStatsRect!: Phaser.GameObjects.Rectangle
  public unitNameText!: Phaser.GameObjects.Text
  public unitNameHPText!: Phaser.GameObjects.Text
  public unitStatsHealthBar!: UIValueBar
  public hoveredUnit: Unit | null = null

  constructor() {
    super('ui')
    UI._instance = this
  }

  public static get instance() {
    return UI._instance
  }

  create() {
    // this.initCameraScrollRectangles()
    this.initTransitionUI()
    this.initAttackUI()
    // this.initUnitStats()
  }

  initUnitStats() {
    this.unitStatsSprite = this.add.sprite(10, 10, 'rat1').setDepth(1000).setScale(2)
    this.unitStatsRect = this.add
      .rectangle(10, 10, 135, 55, 0xd3d5ff, 0.85)
      .setOrigin(0)
      .setStrokeStyle(1, 0x000000)
    this.unitNameText = this.add.text(
      this.unitStatsRect.x + this.unitStatsRect.displayWidth / 2 + 10,
      this.unitStatsRect.y + 5,
      'Rat',
      {
        fontSize: '15px',
        color: 'black',
      }
    )
    this.unitNameHPText = this.add.text(0, 0, 'HP:100/100', { fontSize: '10px', color: 'black' })
    this.unitNameHPText.setPosition(
      this.unitNameText.x -
        this.unitNameHPText.displayWidth / 2 +
        this.unitNameText.displayWidth / 2,
      this.unitNameText.y + this.unitNameText.displayHeight + 2
    )
    this.unitStatsSprite.setPosition(
      this.unitNameHPText.x / 2 + 5,
      this.unitStatsRect.y + this.unitStatsRect.displayHeight / 2
    )
    this.unitStatsHealthBar = new UIValueBar(this, {
      x: this.unitNameHPText.x,
      y: this.unitNameHPText.y + this.unitNameHPText.displayHeight + 5,
      maxValue: 100,
      height: 4,
      width: this.unitNameHPText.displayWidth,
      borderWidth: 2,
      fillColor: 0xdbcc70,
      showBorder: true,
    })
  }

  initAttackUI() {
    this.attackModal = this.add
      .rectangle(
        GameConstants.WINDOW_WIDTH / 2,
        GameConstants.WINDOW_HEIGHT / 2,
        GameConstants.WINDOW_WIDTH * 0.75,
        GameConstants.WINDOW_HEIGHT * 0.5,
        0xffffff
      )
      .setVisible(false)
    this.attackerSprite = this.add
      .sprite(this.attackModal.x - 50, this.attackModal.y, '')
      .setVisible(false)
      .setDepth(1000)
    this.defenderSprite = this.add
      .sprite(this.attackModal.x + 50, this.attackModal.y, '')
      .setFlipX(true)
      .setVisible(false)
      .setDepth(1000)
  }

  playAttackAnimation(attacker: Unit, defender: Unit, onEndCb: Function) {
    this.attackModal.setVisible(true).setOrigin(0)
    this.tweens.add({
      targets: this.attackModal,
      width: { from: 0, to: GameConstants.WINDOW_WIDTH * 0.75 },
      height: { from: 0, to: GameConstants.WINDOW_HEIGHT * 0.5 },
      duration: 500,
      onUpdate: (tween, target, param) => {
        target.setPosition(
          GameConstants.WINDOW_WIDTH / 2 - target.displayWidth / 2,
          GameConstants.WINDOW_HEIGHT / 2 - target.displayHeight / 2
        )
      },
      onComplete: () => {
        this.attackerSprite.setVisible(true).setTexture(attacker.texture)
        this.defenderSprite.setVisible(true).setTexture(defender.texture)
        this.tweens.add({
          delay: 2000,
          targets: this.attackModal,
          width: { to: 0, from: GameConstants.WINDOW_WIDTH * 0.75 },
          height: { to: 0, from: GameConstants.WINDOW_HEIGHT * 0.5 },
          duration: 500,
          onStart: () => {
            this.attackerSprite.setVisible(false)
            this.defenderSprite.setVisible(false)
          },
          onUpdate: (tween, target, param) => {
            target.setPosition(
              GameConstants.WINDOW_WIDTH / 2 - target.displayWidth / 2,
              GameConstants.WINDOW_HEIGHT / 2 - target.displayHeight / 2
            )
          },
          onComplete: () => {
            onEndCb()
          },
        })
      },
    })
  }

  initTransitionUI() {
    this.transitionRect = this.add
      .rectangle(
        GameConstants.WINDOW_WIDTH / 2,
        GameConstants.WINDOW_HEIGHT / 2,
        GameConstants.WINDOW_WIDTH,
        GameConstants.WINDOW_HEIGHT,
        0x000000,
        1
      )
      .setVisible(false)
      .setDepth(999)
    this.transitionText = this.add
      .text(GameConstants.WINDOW_WIDTH / 2, GameConstants.WINDOW_HEIGHT / 2, '')
      .setVisible(false)
      .setDepth(1000)
  }

  transitionTurn(onEndCb: Function) {
    this.transitionText.setText('Player Turn')
    if (Game.instance.currTurn === Side.CPU) {
      this.transitionText.setText('CPU Turn')
    }
    this.transitionText.setPosition(
      GameConstants.WINDOW_WIDTH / 2 - this.transitionText.displayWidth / 2,
      GameConstants.WINDOW_HEIGHT / 2 - this.transitionText.displayHeight / 2
    )
    this.add.tween({
      targets: this.transitionRect,
      alpha: { from: 0, to: 0.5 },
      onStart: () => {
        this.transitionRect.setVisible(true)
      },
      onComplete: () => {
        onEndCb()
      },
      duration: 750,
      hold: 500,
      yoyo: true,
    })
    this.add.tween({
      targets: this.transitionText,
      alpha: { from: 0, to: 1 },
      onStart: () => {
        this.transitionText.setVisible(true)
      },
      duration: 750,
      hold: 500,
      yoyo: true,
    })
  }

  initCameraScrollRectangles() {
    this.leftCamScrollRect = this.createScrollRect(
      16,
      GameConstants.WINDOW_HEIGHT / 2,
      UI.SCROLL_RECT_WIDTH,
      UI.SCROLL_RECT_HEIGHT,
      () => {
        if (!this.isScrollingCamera) {
          this.isScrollingCamera = true
          Game.instance.startCameraPan(Direction.LEFT)
        }
      },
      () => {
        this.isScrollingCamera = false
        Game.instance.stopCameraPan()
      }
    )
    this.rightCamScrollRect = this.createScrollRect(
      GameConstants.WINDOW_WIDTH - 16,
      GameConstants.WINDOW_HEIGHT / 2,
      UI.SCROLL_RECT_WIDTH,
      UI.SCROLL_RECT_HEIGHT,
      () => {
        if (!this.isScrollingCamera) {
          this.isScrollingCamera = true
          Game.instance.startCameraPan(Direction.RIGHT)
        }
      },
      () => {
        this.isScrollingCamera = false
        Game.instance.stopCameraPan()
      }
    )
    this.upCamScrollRect = this.createScrollRect(
      GameConstants.WINDOW_WIDTH / 2,
      16,
      UI.SCROLL_RECT_HEIGHT,
      UI.SCROLL_RECT_WIDTH,
      () => {
        if (!this.isScrollingCamera) {
          this.isScrollingCamera = true
          Game.instance.startCameraPan(Direction.UP)
        }
      },
      () => {
        this.isScrollingCamera = false
        Game.instance.stopCameraPan()
      }
    )

    this.downCamScrollRect = this.createScrollRect(
      GameConstants.WINDOW_WIDTH / 2,
      GameConstants.WINDOW_HEIGHT - 16,
      UI.SCROLL_RECT_HEIGHT,
      UI.SCROLL_RECT_WIDTH,
      () => {
        if (!this.isScrollingCamera) {
          this.isScrollingCamera = true
          Game.instance.startCameraPan(Direction.DOWN)
        }
      },
      () => {
        this.isScrollingCamera = false
        Game.instance.stopCameraPan()
      }
    )
  }

  private createScrollRect(
    x: number,
    y: number,
    width: number,
    height: number,
    onPointerOver: Function,
    onPointerOut: Function
  ) {
    return this.add
      .rectangle(x, y, width, height, 0xff0000, 0)
      .setInteractive()
      .setDepth(1000)
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        onPointerOver()
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        onPointerOut()
      })
  }
}
