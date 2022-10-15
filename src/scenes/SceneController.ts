import { FULL_GAME_LEVEL_CONFIG, PRE_GAME_CONFIG, SceneType } from '~/utils/LevelConfig'
import { Overworld } from './Overworld'

export class SceneController extends Phaser.Scene {
  public static instance: SceneController
  public preGameLevels = PRE_GAME_CONFIG
  public allLevels = FULL_GAME_LEVEL_CONFIG // Each "level" is comprised of a list of scene configs

  // Index of the current PRE-GAME level index (tutorials, etc.)
  public currPreGameLevelIndex: number = 0
  public currPreGameLevelSubSceneIndex: number = 0
  public isPreGame: boolean = true

  // Index of the current GAME level, as well as scene in the level
  public currLevelIndex: number = 0 // Get the index of the level
  public currLevelSubSceneIndex: number = 0 // Get the index of the scene config within each level
  public gameFinished: boolean = false

  constructor() {
    super('scene-controller')
    SceneController.instance = this
  }

  playGameLevelForIndex(levelIndex: number) {
    this.playLevelScene(this.allLevels, levelIndex, 0)
  }

  playLevelScene(levels: any[], levelIndex: number, levelSubSceneIndex: number) {
    const currLevel = levels[levelIndex]
    const currScene = currLevel.scenes[levelSubSceneIndex]
    switch (currScene.sceneType) {
      case SceneType.CUTSCENE: {
        this.scene.stop('overworld')
        this.scene.stop('game')
        this.scene.stop('game-ui')
        this.scene.stop('dialog')
        this.scene.start('cutscene', currScene.config)
        this.scene.start('cutscene-overlay')
        break
      }
      case SceneType.DIALOG: {
        this.scene.stop('overworld')
        this.scene.stop('game')
        this.scene.stop('game-ui')
        this.scene.stop('cutscene')
        this.scene.stop('cutscene-overlay')
        this.scene.start('dialog', currScene.config)
        break
      }
      case SceneType.GAME: {
        this.scene.stop('overworld')
        this.scene.stop('cutscene')
        this.scene.stop('cutscene-overlay')
        this.scene.start('game', currScene.config)
        this.scene.start('game-ui')
        this.scene.stop('dialog')
        break
      }
    }
  }

  goToOverworldWithCompletedLevel(levelName: string) {
    Overworld.instance.startWithCompletedLevel(levelName)
    this.scene.stop('cutscene')
    this.scene.stop('cutscene-overlay')
    this.scene.stop('game')
    this.scene.stop('game-ui')
    this.scene.stop('dialog')
    this.scene.start('overworld')
  }

  create() {
    Overworld.instance.configure(this.allLevels)
    if (this.isPreGame) {
      this.playLevelScene(
        this.preGameLevels,
        this.currPreGameLevelIndex,
        this.currPreGameLevelSubSceneIndex
      )
    } else {
      this.playLevelScene(this.allLevels, this.currLevelIndex, this.currLevelSubSceneIndex)
    }
  }

  finishLevel(levelName: string) {
    Overworld.instance.startWithCompletedLevel(levelName)
  }

  onSceneCompleted() {
    if (this.isPreGame) {
      const currLevel = this.preGameLevels[this.currPreGameLevelIndex]
      this.currPreGameLevelSubSceneIndex++
      if (this.currPreGameLevelSubSceneIndex >= currLevel.scenes.length) {
        this.currPreGameLevelSubSceneIndex = 0
        this.currPreGameLevelIndex++
        if (this.currPreGameLevelIndex >= this.preGameLevels.length) {
          this.isPreGame = false
          this.playLevelScene(this.allLevels, 0, 0)
        } else {
          this.playLevelScene(
            this.preGameLevels,
            this.currPreGameLevelIndex,
            this.currPreGameLevelSubSceneIndex
          )
        }
      }
    } else {
      const currLevel = this.allLevels[this.currLevelIndex]
      this.currLevelSubSceneIndex++
      if (this.currLevelSubSceneIndex >= currLevel.scenes.length) {
        this.currLevelSubSceneIndex = 0
        this.currLevelIndex++
        if (this.currLevelIndex >= this.allLevels.length) {
          console.log('GAME FINISHED!')
        } else {
          this.goToOverworldWithCompletedLevel(currLevel.levelName)
        }
      } else {
        this.playLevelScene(this.allLevels, this.currLevelIndex, this.currLevelSubSceneIndex)
      }
    }
  }
}
