import { Scene } from 'phaser'
import { GameConstants } from '~/utils/GameConstants'
import { UIValueBar } from './UIValueBar'

export enum UnitStatsBoxPosition {
  UP = 'up',
  DOWN = 'down',
}

interface UnitStatsBoxConfig {
  name: string
  texture: string
  currHP: number
  maxHP: number
}

export class UnitStatsBox {
  private static readonly RECT_HEIGHT = 55
  private static readonly RECT_WIDTH = 135

  unitStatsSprite: Phaser.GameObjects.Sprite
  unitStatsRect: Phaser.GameObjects.Rectangle
  unitNameText: Phaser.GameObjects.Text
  unitHPText: Phaser.GameObjects.Text
  unitStatsHealthBar: UIValueBar
  scene: Scene

  constructor(scene: Scene, unitStatsBoxConfig: UnitStatsBoxConfig) {
    this.scene = scene
    this.unitStatsRect = this.scene.add
      .rectangle(10, 10, UnitStatsBox.RECT_WIDTH, UnitStatsBox.RECT_HEIGHT, 0xd3d5ff, 0.85)
      .setOrigin(0)
      .setStrokeStyle(1, 0x000000)
    this.unitStatsSprite = this.scene.add.sprite(36, 37, 'rat1').setDepth(1000).setScale(2)
    this.unitNameText = this.scene.add.text(
      this.unitStatsSprite.x + this.unitStatsSprite.displayWidth / 2 + 10,
      18,
      'Rat',
      {
        fontSize: '13px',
        color: 'black',
      }
    )
    this.unitHPText = this.scene.add.text(
      this.unitNameText.x,
      this.unitNameText.y + this.unitNameText.displayHeight + 2,
      'HP:100/100',
      { fontSize: '10px', color: 'black' }
    )
    this.unitStatsHealthBar = new UIValueBar(this.scene, {
      x: this.unitHPText.x,
      y: this.unitHPText.y + this.unitHPText.displayHeight + 5,
      maxValue: 100,
      height: 4,
      width: this.unitHPText.displayWidth,
      borderWidth: 2,
      fillColor: 0xdbcc70,
      showBorder: true,
    })
  }

  setVisible(isVisible: boolean) {
    this.unitStatsSprite.setVisible(isVisible)
    this.unitStatsRect.setVisible(isVisible)
    this.unitNameText.setVisible(isVisible)
    this.unitHPText.setVisible(isVisible)
    this.unitStatsHealthBar.setVisible(isVisible)
  }

  updateStats(updateConfig: { currHP: number; maxHP: number; name: string; texture: string }) {
    const { currHP, maxHP, name, texture } = updateConfig
    this.unitStatsSprite.setTexture(texture)
    this.unitStatsHealthBar.setCurrValue(currHP)
    this.unitStatsHealthBar.setMaxValue(maxHP)
    this.unitHPText.setText(`HP: ${currHP}/${maxHP}`)
    this.unitNameText.setText(name)
  }

  moveToPosition(position: UnitStatsBoxPosition) {
    if (position === UnitStatsBoxPosition.DOWN) {
      this.unitStatsRect.setPosition(
        10,
        GameConstants.WINDOW_HEIGHT - UnitStatsBox.RECT_HEIGHT - 10
      )
      this.unitStatsSprite.setPosition(36, GameConstants.WINDOW_HEIGHT - 37)
      this.unitNameText.setPosition(
        this.unitStatsSprite.x + this.unitStatsSprite.displayWidth / 2 + 10,
        GameConstants.WINDOW_HEIGHT - UnitStatsBox.RECT_HEIGHT
      )
    } else {
      this.unitStatsRect.setPosition(10, 10)
      this.unitStatsSprite.setPosition(36, 37)
      this.unitNameText.setPosition(
        this.unitStatsSprite.x + this.unitStatsSprite.displayWidth / 2 + 10,
        18
      )
    }
    this.repositionAllElements()
  }

  repositionAllElements() {
    this.unitHPText.setPosition(
      this.unitNameText.x,
      this.unitNameText.y + this.unitNameText.displayHeight + 2
    )
    this.unitStatsHealthBar.setPosition(
      this.unitHPText.x,
      this.unitHPText.y + this.unitHPText.displayHeight + 5
    )
  }
}
