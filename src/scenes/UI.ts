import { Direction } from '~/utils/Directions'
import { GameConstants } from '~/utils/GameConstants'
import Game from './Game'

export class UI extends Phaser.Scene {
  public static readonly SCROLL_RECT_HEIGHT = 192
  public static readonly SCROLL_RECT_WIDTH = 32

  public isScrollingCamera: boolean = false

  public leftCamScrollRect!: Phaser.GameObjects.Rectangle
  public rightCamScrollRect!: Phaser.GameObjects.Rectangle
  public upCamScrollRect!: Phaser.GameObjects.Rectangle
  public downCamScrollRect!: Phaser.GameObjects.Rectangle

  constructor() {
    super('ui')
  }

  create() {
    this.initCameraScrollRectangles()
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
