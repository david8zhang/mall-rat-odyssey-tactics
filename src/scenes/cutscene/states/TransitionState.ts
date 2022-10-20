import { CutsceneCharacterConfig } from '../CutsceneConstants'
import { CutsceneState } from './CutsceneState'

export interface TransitionStateConfig {
  newState: {
    characterConfigs: {
      [key: string]: CutsceneCharacterConfig
    }
  }
}

export class TransitionState extends CutsceneState {
  public processState(onEndCb: Function, config: TransitionStateConfig): void {
    this.cutscene.canGoToNextState = false
    this.cutscene.cameras.main.fadeOut(1000, 0, 0, 0, (_, progress) => {
      if (progress === 1) {
        this.cutscene.resetCharacterConfigs()
        this.cutscene.initCutsceneState(config.newState)
        this.cutscene.cameras.main.fadeIn(1000, 0, 0, 0, (_, progress) => {
          if (progress === 1) {
            this.cutscene.canGoToNextState = true
            onEndCb()
          }
        })
      }
    })
  }
}
