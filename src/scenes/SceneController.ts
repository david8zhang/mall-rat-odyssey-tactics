import { SAMPLE_GAME_LEVEL_CONFIG, SceneType } from '~/utils/LevelConfig'

export class SceneController extends Phaser.Scene {
  public static instance: SceneController
  public levelConfig = SAMPLE_GAME_LEVEL_CONFIG // Each "level" is comprised of a list of scene configs
  public currLevelIndex: number = 0 // Get the index of the level

  public currLevelSubSceneIndex: number = 0 // Get the index of the scene config within each level

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
        this.scene.stop('ui')
        this.scene.stop('dialog')
        this.scene.start('cutscene', currScene.config)
        this.scene.start('cutscene-overlay')
        break
      }
      case SceneType.DIALOG: {
        this.scene.stop('game')
        this.scene.stop('ui')
        this.scene.stop('cutscene')
        this.scene.stop('cutscene-overlay')
        this.scene.start('dialog', currScene.config)
        break
      }
      case SceneType.GAME: {
        this.scene.stop('cutscene')
        this.scene.stop('cutscene-overlay')
        this.scene.start('game', currScene.config)
        this.scene.start('ui')
        this.scene.stop('dialog')
        break
      }
    }
  }

  create() {
    this.playLevelScene()
  }

  onSceneCompleted() {
    const currLevel = this.levelConfig[this.currLevelIndex]
    this.currLevelSubSceneIndex++
    if (this.currLevelSubSceneIndex >= currLevel.length) {
      this.currLevelSubSceneIndex = 0
      this.currLevelIndex++
      if (this.currLevelIndex >= this.levelConfig.length) {
        console.log('Game finished!')
        return
      } else {
        this.playLevelScene()
      }
    } else {
      this.playLevelScene()
    }
  }
}
