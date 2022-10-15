import { ALL_GAME_CONFIG, GameConfig, SceneType } from '~/utils/LevelConfig'
import { Overworld } from './overworld/Overworld'

export class SceneController extends Phaser.Scene {
  public static instance: SceneController
  public gameConfig: GameConfig = ALL_GAME_CONFIG

  // Index of the current PRE-GAME level index (tutorials, etc.)
  public currPreGameLevelIndex: number = 0
  public currPreGameLevelSubSceneIndex: number = 0
  public isPreGame: boolean = false

  // Index of the current GAME level, as well as scene in the level
  public currLevelIndex: number = 0 // Get the index of the level
  public currLevelSubSceneIndex: number = 0 // Get the index of the scene config within each level
  public gameFinished: boolean = false

  constructor() {
    super('scene-controller')
    SceneController.instance = this
  }

  playGameLevelForIndex(levelIndex: number) {
    this.playLevelScene(this.gameConfig.gameLevels, levelIndex, 0)
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
    Overworld.instance.configure(this.gameConfig.gameLevels)
    this.isPreGame = this.gameConfig.preGameLevels.length > 0
    if (this.isPreGame) {
      this.playLevelScene(
        this.gameConfig.preGameLevels,
        this.currPreGameLevelIndex,
        this.currPreGameLevelSubSceneIndex
      )
    } else {
      this.playLevelScene(
        this.gameConfig.gameLevels,
        this.currLevelIndex,
        this.currLevelSubSceneIndex
      )
    }
  }

  finishLevel(levelName: string) {
    Overworld.instance.startWithCompletedLevel(levelName)
  }

  restartCurrentLevel() {
    this.currLevelSubSceneIndex = 0
    this.playLevelScene(
      this.gameConfig.gameLevels,
      this.currLevelIndex,
      this.currLevelSubSceneIndex
    )
  }

  onSceneCompleted() {
    if (this.isPreGame) {
      const currLevel = this.gameConfig.preGameLevels[this.currPreGameLevelIndex]
      this.currPreGameLevelSubSceneIndex++
      if (this.currPreGameLevelSubSceneIndex >= currLevel.scenes.length) {
        this.currPreGameLevelSubSceneIndex = 0
        this.currPreGameLevelIndex++
        if (this.currPreGameLevelIndex >= this.gameConfig.preGameLevels.length) {
          this.isPreGame = false
          this.playLevelScene(this.gameConfig.gameLevels, 0, 0)
        } else {
          this.playLevelScene(
            this.gameConfig.preGameLevels,
            this.currPreGameLevelIndex,
            this.currPreGameLevelSubSceneIndex
          )
        }
      }
    } else {
      const currLevel = this.gameConfig.gameLevels[this.currLevelIndex]
      this.currLevelSubSceneIndex++
      if (this.currLevelSubSceneIndex >= currLevel.scenes.length) {
        this.currLevelSubSceneIndex = 0
        this.currLevelIndex++
        if (this.currLevelIndex >= this.gameConfig.gameLevels.length) {
          console.log('GAME FINISHED!')
        } else {
          this.goToOverworldWithCompletedLevel(currLevel.levelName)
        }
      } else {
        this.playLevelScene(
          this.gameConfig.gameLevels,
          this.currLevelIndex,
          this.currLevelSubSceneIndex
        )
      }
    }
  }
}
