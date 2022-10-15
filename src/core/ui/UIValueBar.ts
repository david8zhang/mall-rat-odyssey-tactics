interface UIValueBarConfig {
  x: number
  y: number
  maxValue: number
  height: number
  width: number
  borderWidth: number
  fillColor?: number
  showBorder?: boolean
  isVertical?: boolean
  shouldChangeColor?: boolean
}

export class UIValueBar {
  bar: Phaser.GameObjects.Graphics
  x: number
  y: number
  maxValue: number
  currValue: number

  height: number
  width: number
  fillColor: number
  showBorder: boolean
  borderWidth: number
  isVertical: boolean = false
  shouldChangeColor: boolean = false

  constructor(scene: Phaser.Scene, config: UIValueBarConfig) {
    this.bar = new Phaser.GameObjects.Graphics(scene)
    const { x, y, maxValue, width, height, fillColor, showBorder, borderWidth } = config
    this.x = x
    this.y = y
    this.maxValue = maxValue
    this.currValue = maxValue
    this.width = width
    this.height = height
    this.borderWidth = borderWidth

    if (config.isVertical) {
      this.isVertical = config.isVertical
    }
    if (config.shouldChangeColor) {
      this.shouldChangeColor = config.shouldChangeColor
    }

    this.fillColor = fillColor || 0x2ecc71
    this.showBorder = showBorder || false
    scene.add.existing(this.bar)
    this.draw()
    this.bar.setDepth(100)
  }

  setVisible(visible: boolean) {
    this.bar.setVisible(visible)
  }

  decrease(amount: number) {
    this.currValue = Math.max(0, this.currValue - amount)
    this.draw()
    return this.currValue === 0
  }

  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
    this.draw()
  }

  increase(amount: number) {
    this.currValue = Math.min(this.maxValue, this.currValue + amount)
    this.draw()
    return this.currValue === this.maxValue
  }

  setMaxValue(maxValue: number) {
    this.maxValue = maxValue
    this.draw()
  }

  setCurrValue(currValue: number) {
    this.currValue = currValue
    this.draw()
  }

  draw() {
    this.bar.clear()

    // Border
    const borderWidth = this.showBorder ? this.borderWidth : 0
    this.bar.fillStyle(0x000000)

    this.bar.fillRect(
      this.x - borderWidth / 2,
      this.y - borderWidth / 2,
      this.width + borderWidth,
      this.height + borderWidth
    )

    const percentage = this.currValue / this.maxValue
    this.bar.fillStyle(this.fillColor)

    if (this.shouldChangeColor) {
      if (percentage <= 0.25) {
        this.bar.fillStyle(0xff0000)
      } else if (percentage <= 0.5) {
        this.bar.fillStyle(0xf1c40f)
      } else {
        this.bar.fillStyle(this.fillColor)
      }
    }

    if (this.isVertical) {
      const length = Math.round(percentage * this.height)
      const remainderLength = Math.round((1 - percentage) * this.height)
      this.bar.fillRect(this.x, this.y + remainderLength, this.width, length)
    } else {
      const length = Math.floor(percentage * this.width)
      this.bar.fillRect(this.x, this.y, length, this.height)
    }
  }

  destroy() {
    this.bar.destroy()
  }
}
