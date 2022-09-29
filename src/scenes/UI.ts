import { UIValueBar } from '~/core/ui/UIValueBar'
import { UnitStatsBox } from '~/core/ui/UnitStatsBox'
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
  public attackAnimationSprite!: Phaser.GameObjects.Sprite
  public attackerSprite!: Phaser.GameObjects.Sprite
  public defenderSprite!: Phaser.GameObjects.Sprite

  public unitStatsBox!: UnitStatsBox
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
    this.initUnitStats()
  }

  initUnitStats() {
    this.unitStatsBox = new UnitStatsBox(this, {
      name: 'Rat',
      texture: 'rat1',
      currHP: 100,
      maxHP: 100,
    })
    this.unitStatsBox.setVisible(false)
  }

  hideUnitStats() {
    this.unitStatsBox.setVisible(false)
  }

  hoverUnit(unit: Unit) {
    this.unitStatsBox.setVisible(true)
    this.unitStatsBox.updateStats({
      currHP: unit.currHealth,
      maxHP: unit.maxHealth,
      name: unit.name,
      texture: unit.sprite.texture.key,
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
    this.attackAnimationSprite = this.add
      .sprite(this.attackerSprite.x, this.attackerSprite.y, 'slash')
      .setVisible(false)
      .setDepth(1500)
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
          targets: this.attackerSprite,
          duration: 500,
          x: {
            from: this.attackerSprite.x,
            to: this.defenderSprite.x - this.defenderSprite.displayWidth,
          },
          onComplete: () => {
            this.attackAnimationSprite
              .setPosition(
                this.attackerSprite.x + this.attackerSprite.displayWidth,
                this.attackerSprite.y
              )
              .setVisible(true)
              .play('slash')
            this.tweens.add({
              delay: 2000,
              targets: this.attackModal,
              width: { to: 0, from: GameConstants.WINDOW_WIDTH * 0.75 },
              height: { to: 0, from: GameConstants.WINDOW_HEIGHT * 0.5 },
              duration: 500,
              onStart: () => {
                this.attackerSprite.setPosition(this.attackModal.x - 50, this.attackModal.y)
                this.attackerSprite.setVisible(false)
                this.defenderSprite.setVisible(false)
                this.attackAnimationSprite.setVisible(false)
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
