import { GameConstants } from '~/scenes/game/GameConstants'
import { OverworldLevelConfig } from '~/scenes/overworld/OverworldConstants'
import { SceneController } from '../SceneController'

export class Overworld extends Phaser.Scene {
  private static readonly OVERWORLD_BG_COLOR = 0x542c29
  private static readonly LEVEL_COMPLETE_COLOR = 0x00873e
  private static readonly LEVEL_INCOMPLETE_COLOR = 0xff0000
  private static readonly LEVEL_LOCKED_COLOR = 0x333333

  private playerSprite!: Phaser.GameObjects.Sprite
  public levelSelectorCircles: Phaser.GameObjects.Ellipse[] = []
  public currLevelIdx: number = 0
  public levelConfig: OverworldLevelConfig[] = []
  public isMovingToNewLevel: boolean = false

  public completedLevels: string[] = []

  public static instance: Overworld

  constructor() {
    super('overworld')
    Overworld.instance = this
  }

  configure(levelConfig: OverworldLevelConfig[]) {
    this.levelConfig = levelConfig
  }

  initScale() {
    this.game.scale.resize(GameConstants.WINDOW_WIDTH, GameConstants.WINDOW_HEIGHT)
    this.game.scale.setZoom(GameConstants.GAME_ZOOM_FACTOR)
  }

  startWithCompletedLevel(levelName: string) {
    if (!this.completedLevels.includes(levelName)) {
      this.completedLevels.push(levelName)
    }
  }

  create() {
    this.cameras.main.setBackgroundColor(Overworld.OVERWORLD_BG_COLOR)
    this.initScale()
    this.initLevelSelectors()
    this.initPlayerOWSprite()
    this.initKeyboardListener()
    this.configurePlayerOWSprite()
  }

  initKeyboardListener() {
    this.input.keyboard.on('keydown', (e) => {
      switch (e.key) {
        case 'Enter': {
          SceneController.instance.playGameLevelForIndex(this.currLevelIdx)
          break
        }
        case 'ArrowRight': {
          this.moveToNextLevel()
          break
        }
        case 'ArrowLeft': {
          this.moveToPrevLevel()
          break
        }
      }
    })
  }

  moveToNextLevel() {
    if (this.currLevelIdx < this.levelConfig.length - 1 && !this.isMovingToNewLevel) {
      const currLevel = this.levelSelectorCircles[this.currLevelIdx]
      const nextLevel = this.levelSelectorCircles[this.currLevelIdx + 1]
      const nextLevelConfig = this.levelConfig[this.currLevelIdx + 1]
      if (this.levelPreReqCompleted(nextLevelConfig.prereqs)) {
        this.isMovingToNewLevel = true
        this.tweens.add({
          targets: this.playerSprite,
          x: {
            from: currLevel.x,
            to: nextLevel.x,
          },
          duration: 500,
          onComplete: () => {
            this.currLevelIdx++
            this.isMovingToNewLevel = false
          },
        })
      }
    }
  }

  moveToPrevLevel() {
    if (this.currLevelIdx > 0 && !this.isMovingToNewLevel) {
      const currLevel = this.levelSelectorCircles[this.currLevelIdx]
      const prevLevel = this.levelSelectorCircles[this.currLevelIdx - 1]
      this.isMovingToNewLevel = true
      this.tweens.add({
        targets: this.playerSprite,
        x: {
          from: currLevel.x,
          to: prevLevel.x,
        },
        duration: 500,
        onComplete: () => {
          this.currLevelIdx--
          this.isMovingToNewLevel = false
        },
      })
    }
  }

  initPlayerOWSprite() {
    this.playerSprite = this.add.sprite(100, 100, 'pippin').setVisible(false)
    this.cameras.main.startFollow(this.playerSprite)
  }

  configurePlayerOWSprite() {
    if (this.levelSelectorCircles.length > 0) {
      const currLevel = this.levelSelectorCircles[this.currLevelIdx]
      this.playerSprite
        .setPosition(currLevel.x, currLevel.y - currLevel.height / 2)
        .setVisible(true)
        .setDepth(3)
    }
  }

  levelPreReqCompleted(prereq: string[]) {
    for (let i = 0; i < prereq.length; i++) {
      if (!this.completedLevels.includes(prereq[i])) {
        return false
      }
    }
    return true
  }

  initLevelSelectors() {
    let currPosition = {
      x: GameConstants.WINDOW_WIDTH / 2,
      y: GameConstants.WINDOW_HEIGHT / 2,
    }
    const distBetweenCircles = 150
    this.levelConfig.forEach((config, index) => {
      const isCompleted = this.completedLevels.includes(config.levelName)
      let circleColor = Overworld.LEVEL_INCOMPLETE_COLOR
      if (isCompleted) {
        circleColor = Overworld.LEVEL_COMPLETE_COLOR
      }
      if (!this.levelPreReqCompleted(config.prereqs)) {
        circleColor = Overworld.LEVEL_LOCKED_COLOR
      }
      const newCircle = this.add
        .ellipse(currPosition.x, currPosition.y, 30, 15, circleColor)
        .setStrokeStyle(1, 0xffffff)
        .setDepth(2)
      this.levelSelectorCircles.push(newCircle)
      if (index != this.levelConfig.length - 1) {
        this.add
          .line(
            0,
            0,
            currPosition.x + 75,
            currPosition.y,
            currPosition.x + distBetweenCircles + 30,
            currPosition.y,
            0xffffff
          )
          .setLineWidth(1)
      }
      currPosition.x += distBetweenCircles
      const levelText = this.add.text(newCircle.x, newCircle.y + 10, config.levelName, {
        fontSize: '12px',
        color: 'white',
      })
      levelText.setPosition(newCircle.x - levelText.displayWidth / 2, newCircle.y + 15)
    })
  }
}
