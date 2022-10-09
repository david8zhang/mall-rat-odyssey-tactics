import { FULL_GAME_LEVEL_CONFIG, SceneType } from '~/utils/LevelConfig'

export class SceneController extends Phaser.Scene {
  public static instance: SceneController
  public levelConfig = FULL_GAME_LEVEL_CONFIG // Each "level" is comprised of a list of scene configs
  public currLevelIndex: number = 0 // Get the index of the level

  public currLevelSubSceneIndex: number = 0 // Get the index of the scene config within each level
  public gameFinished: boolean = false

  constructor() {
    super('scene-controller')
    SceneController.instance = this
  }

  playLevelScene() {
    const currLevel = this.levelConfig[this.currLevelIndex]
    const currScene = currLevel[this.currLevelSubSceneIndex]

    switch (currScene.sceneType) {
      case SceneType.CUTSCENE: {
        console.log('Went here!')
        this.scene.stop('game')
        this.scene.stop('game-ui')
        this.scene.stop('dialog')
        this.scene.start('cutscene', currScene.config)
        this.scene.start('cutscene-overlay')
        break
      }
      case SceneType.DIALOG: {
        this.scene.stop('game')
        this.scene.stop('game-ui')
        this.scene.stop('cutscene')
        this.scene.stop('cutscene-overlay')
        this.scene.start('dialog', currScene.config)
        break
      }
      case SceneType.GAME: {
        this.scene.stop('cutscene')
        this.scene.stop('cutscene-overlay')
        this.scene.start('game', currScene.config)
        this.scene.start('game-ui')
        this.scene.stop('dialog')
        break
      }
    }
  }

  create() {
    this.playLevelScene()
  }

  onSceneCompleted() {
    if (this.gameFinished) {
      return
    }

    const currLevel = this.levelConfig[this.currLevelIndex]
    this.currLevelSubSceneIndex++
    if (this.currLevelSubSceneIndex >= currLevel.length) {
      this.currLevelSubSceneIndex = 0
      this.currLevelIndex++
      if (this.currLevelIndex >= this.levelConfig.length) {
        this.gameFinished = true
      } else {
        this.playLevelScene()
      }
    } else {
      this.playLevelScene()
    }
  }
}
