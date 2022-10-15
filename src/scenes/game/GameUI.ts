import { UINumber } from '~/core/ui/UINumber'
import { UIValueBar } from '~/core/ui/UIValueBar'
import { UnitStatsBox, UnitStatsBoxPosition } from '~/core/ui/UnitStatsBox'
import { Unit } from '~/core/units/Unit'
import { Direction } from '~/utils/Directions'
import { GameConstants } from '~/scenes/game/GameConstants'
import { Side } from '~/utils/Side'
import Game, { GameOverConditions } from './Game'

export enum AttackDirection {
  RIGHT = 'RiGHT',
  LEFT = 'LEFT',
}

export class GameUI extends Phaser.Scene {
  public static readonly SCROLL_RECT_HEIGHT = 192
  public static readonly SCROLL_RECT_WIDTH = 32
  private static _instance: GameUI

  // Enable camera scroll when mouse moves to the edge of the screen
  public isScrollingCamera: boolean = false
  public leftCamScrollRect!: Phaser.GameObjects.Rectangle
  public rightCamScrollRect!: Phaser.GameObjects.Rectangle
  public upCamScrollRect!: Phaser.GameObjects.Rectangle
  public downCamScrollRect!: Phaser.GameObjects.Rectangle

  // Transition between player/CPU turn text
  public transitionText!: Phaser.GameObjects.Text
  public transitionRect!: Phaser.GameObjects.Rectangle

  // Handle the attack animation
  public attackModal!: Phaser.GameObjects.Rectangle
  public attackAnimationSprite!: Phaser.GameObjects.Sprite
  public attackerSprite!: Phaser.GameObjects.Sprite
  public defenderSprite!: Phaser.GameObjects.Sprite
  public attackerHealthBar!: UIValueBar
  public defenderHealthBar!: UIValueBar
  public attackDirection: AttackDirection = AttackDirection.LEFT

  // A box that appears in the corner of the window displaying the unit's current stats
  public unitStatsBox!: UnitStatsBox
  public hoveredUnit: Unit | null = null

  // UI that appears when battle is over (all player units dead or CPU units dead)
  public gameOverText!: Phaser.GameObjects.Text

  constructor() {
    super('game-ui')
    GameUI._instance = this
  }

  public static get instance() {
    return GameUI._instance
  }

  create() {
    // this.initCameraScrollRectangles()
    this.initTransitionUI()
    this.initAttackUI()
    this.initUnitStats()
    this.initGameOverUI()
  }

  initGameOverUI() {
    this.gameOverText = this.add
      .text(GameConstants.WINDOW_WIDTH / 2, GameConstants.WINDOW_HEIGHT / 2, '')
      .setVisible(false)
      .setDepth(1000)
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
    const gameCamera = Game.instance.cameras.main
    const cameraUpperBound = gameCamera.midPoint.y - gameCamera.height / 2
    const relativeY = unit.sprite.y - cameraUpperBound // get the y position of the unit relative to camera position
    if (relativeY < GameConstants.WINDOW_HEIGHT / 2) {
      this.unitStatsBox.moveToPosition(UnitStatsBoxPosition.DOWN)
    } else {
      this.unitStatsBox.moveToPosition(UnitStatsBoxPosition.UP)
    }
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

    const healthBarWidth = this.attackerSprite.displayWidth * 2
    this.attackerHealthBar = new UIValueBar(this, {
      x: this.attackerSprite.x - healthBarWidth / 2,
      y: this.attackerSprite.y + 25,
      maxValue: 100,
      height: 4,
      width: this.attackerSprite.displayWidth * 2,
      borderWidth: 2,
      fillColor: 0xdbcc70,
      showBorder: true,
    })
    this.defenderHealthBar = new UIValueBar(this, {
      x: this.defenderSprite.x - healthBarWidth / 2,
      y: this.defenderSprite.y + 25,
      maxValue: 100,
      height: 4,
      width: this.defenderSprite.displayWidth * 2,
      borderWidth: 2,
      fillColor: 0xdbcc70,
      showBorder: true,
    })
    this.attackerHealthBar.setVisible(false)
    this.defenderHealthBar.setVisible(false)
  }

  private playDefenderDeathAnimation(onEndCb: Function) {
    this.tweens.add({
      delay: 500,
      targets: this.defenderSprite,
      alpha: { from: 1, to: 0 },
      duration: 1000,
      onComplete: () => {
        this.defenderSprite.setVisible(false).setAlpha(1)
        onEndCb()
      },
    })
  }

  private tweenAttackModalOut(onEndCb: Function) {
    // Tween the modal closing
    this.tweens.add({
      delay: 1000,
      targets: this.attackModal,
      width: { to: 0, from: GameConstants.WINDOW_WIDTH * 0.75 },
      height: { to: 0, from: GameConstants.WINDOW_HEIGHT * 0.5 },
      duration: 500,
      onStart: () => {
        // Reset all the sprites back to their original positions
        if (this.attackDirection === AttackDirection.RIGHT) {
          this.attackerSprite.setPosition(
            GameConstants.WINDOW_WIDTH / 2 + 50,
            GameConstants.WINDOW_HEIGHT / 2
          )
        } else {
          this.attackerSprite.setPosition(
            GameConstants.WINDOW_WIDTH / 2 - 50,
            GameConstants.WINDOW_HEIGHT / 2
          )
        }
        this.attackerSprite.setVisible(false)
        this.defenderSprite.setVisible(false)
        this.attackerHealthBar.setVisible(false)
        this.defenderHealthBar.setVisible(false)
        this.attackAnimationSprite.setVisible(false)
      },
      onUpdate: (tween, target, param) => {
        target.setPosition(
          GameConstants.WINDOW_WIDTH / 2 - target.displayWidth / 2,
          GameConstants.WINDOW_HEIGHT / 2 - target.displayHeight / 2
        )
      },
      onComplete: () => {
        this.attackModal.setVisible(false)
        onEndCb()
      },
    })
  }

  configureAttackAnimationModal(direction: AttackDirection) {
    this.attackDirection = direction
    if (direction === AttackDirection.LEFT) {
      this.attackerSprite
        .setPosition(GameConstants.WINDOW_WIDTH / 2 - 50, GameConstants.WINDOW_HEIGHT / 2)
        .setFlipX(false)
      this.defenderSprite
        .setPosition(GameConstants.WINDOW_WIDTH / 2 + 50, GameConstants.WINDOW_HEIGHT / 2)
        .setFlipX(true)
    } else {
      this.attackerSprite
        .setPosition(GameConstants.WINDOW_WIDTH / 2 + 50, GameConstants.WINDOW_HEIGHT / 2)
        .setFlipX(true)
      this.defenderSprite
        .setPosition(GameConstants.WINDOW_WIDTH / 2 - 50, GameConstants.WINDOW_HEIGHT / 2)
        .setFlipX(false)
    }
    this.attackerHealthBar.setPosition(this.attackerSprite.x - 32, this.attackerSprite.y + 25)
    this.defenderHealthBar.setPosition(this.defenderSprite.x - 32, this.defenderSprite.y + 25)
  }

  playAttackAnimation(
    attacker: Unit,
    defender: Unit,
    damageDealt: number,
    onEndCb: Function,
    onAttackCb: Function
  ) {
    // Start animation to show attack modal
    this.tweens.add({
      targets: this.attackModal,
      width: { from: 0, to: GameConstants.WINDOW_WIDTH * 0.75 },
      height: { from: 0, to: GameConstants.WINDOW_HEIGHT * 0.5 },
      duration: 500,
      onStart: () => {
        this.attackModal.setVisible(true).setOrigin(0)
      },
      onUpdate: (tween, target, param) => {
        target.setPosition(
          GameConstants.WINDOW_WIDTH / 2 - target.displayWidth / 2,
          GameConstants.WINDOW_HEIGHT / 2 - target.displayHeight / 2
        )
      },
      onComplete: () => {
        // Show attacker and defender UI
        this.attackerSprite.setVisible(true).setTexture(attacker.texture)
        this.defenderSprite.setVisible(true).setTexture(defender.texture)
        this.attackerHealthBar.setVisible(true)
        this.attackerHealthBar.setCurrValue(attacker.currHealth)
        this.attackerHealthBar.setMaxValue(attacker.maxHealth)
        this.defenderHealthBar.setVisible(true)
        this.defenderHealthBar.setCurrValue(defender.currHealth)
        this.defenderHealthBar.setMaxValue(defender.maxHealth)

        let toPos = this.defenderSprite.x - this.defenderSprite.displayWidth
        if (this.attackDirection == AttackDirection.RIGHT) {
          toPos = this.defenderSprite.x + this.defenderSprite.displayWidth
        }
        this.tweens.add({
          targets: this.attackerSprite,
          duration: 500,
          x: {
            from: this.attackerSprite.x,
            to: toPos,
          },
          onComplete: () => {
            // Actual attack animation gets played here
            this.attackAnimationSprite
              .on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.attackAnimationSprite.removeAllListeners()
                if (defender.currHealth === 0) {
                  this.playDefenderDeathAnimation(() => {
                    defender.die()
                    this.tweenAttackModalOut(onEndCb)
                  })
                } else {
                  this.tweenAttackModalOut(onEndCb)
                }
              })
              .on(Phaser.Animations.Events.ANIMATION_UPDATE, (_, frame) => {
                if (frame.index === 3) {
                  Game.instance.cameras.main.shake(100, 0.005)
                  this.defenderSprite.setTintFill(0xff0000)
                  UINumber.createNumber(
                    `-${damageDealt}`,
                    this,
                    this.defenderSprite.x,
                    this.defenderSprite.y
                  )
                  this.defenderHealthBar.decrease(damageDealt)
                  onAttackCb(attacker, defender)
                }
                if (frame.index === 4) {
                  this.defenderSprite.clearTint()
                }
              })

            let animPosX = this.attackerSprite.x + this.attackerSprite.displayWidth
            if (this.attackDirection === AttackDirection.RIGHT) {
              animPosX = this.attackerSprite.x - this.attackerSprite.displayWidth
            }
            this.attackAnimationSprite
              .setPosition(animPosX, this.attackerSprite.y)
              .setVisible(true)
              .setFlipX(this.attackDirection === AttackDirection.RIGHT ? true : false)
              .play('slash')
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

  showGameOverUI(gameOverCondition: GameOverConditions, onEndCb: Function) {
    const gameOverTextContent =
      gameOverCondition === GameOverConditions.PLAYER_WIN ? 'VICTORY' : 'DEFEAT'
    const gameOverTextStyle = {
      fontSize: '25px',
      color: gameOverCondition === GameOverConditions.PLAYER_WIN ? '#00873E' : '#CD001A',
      stroke: '#ffffff',
      strokeThickness: 5,
    }
    this.gameOverText.setText(gameOverTextContent).setVisible(false).setStyle(gameOverTextStyle)
    this.gameOverText.setPosition(
      GameConstants.WINDOW_WIDTH / 2 - this.gameOverText.displayWidth / 2,
      GameConstants.WINDOW_HEIGHT / 2 - this.gameOverText.displayHeight / 2
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
    })
    this.add.tween({
      targets: this.gameOverText,
      alpha: { from: 0, to: 1 },
      onStart: () => {
        this.gameOverText.setVisible(true)
      },
      duration: 750,
      hold: 500,
    })
  }

  hideTransitionUI() {
    this.transitionText.setVisible(false)
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
        this.transitionRect.setVisible(false)
        this.transitionText.setVisible(false)
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
      GameUI.SCROLL_RECT_WIDTH,
      GameUI.SCROLL_RECT_HEIGHT,
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
      GameUI.SCROLL_RECT_WIDTH,
      GameUI.SCROLL_RECT_HEIGHT,
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
      GameUI.SCROLL_RECT_HEIGHT,
      GameUI.SCROLL_RECT_WIDTH,
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
      GameUI.SCROLL_RECT_HEIGHT,
      GameUI.SCROLL_RECT_WIDTH,
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
