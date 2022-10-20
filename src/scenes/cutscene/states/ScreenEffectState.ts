import { GameConstants } from '~/scenes/game/GameConstants'
import { CutsceneState } from './CutsceneState'

export enum ScreenEffects {
  FLASH_COLOR = 'FLASH_COLOR',
}

export interface ScreenEffectConfig {
  effectType: ScreenEffects
  config: any
}

export class ScreenEffectState extends CutsceneState {
  public static readonly SCREEN_EFFECT_MAPPING = {
    [ScreenEffects.FLASH_COLOR]: ScreenEffectState.flashColor,
  }

  public static flashColor(config: any, onCompleteCb: Function) {
    const scene = config.scene as Phaser.Scene
    const invisibleRectangle = scene.add
      .rectangle(
        GameConstants.GAME_WIDTH / 2,
        GameConstants.GAME_HEIGHT / 2,
        GameConstants.WINDOW_WIDTH,
        GameConstants.WINDOW_HEIGHT,
        config.color
      )
      .setVisible(false)
      .setDepth(1000)
      .setAlpha(0)
    scene.tweens.add({
      targets: [invisibleRectangle],
      alpha: {
        from: 0,
        to: 0.5,
      },
      onStart: () => {
        invisibleRectangle.setVisible(true)
      },
      repeat: 2,
      duration: 500,
      yoyo: true,
      onComplete: () => {
        invisibleRectangle.destroy()
        onCompleteCb()
      },
    })
  }

  public processState(onEndCb: Function, screenEffectConfig: ScreenEffectConfig): void {
    this.cutscene.canGoToNextState = false
    const screenEffectFn = ScreenEffectState.SCREEN_EFFECT_MAPPING[screenEffectConfig.effectType]
    screenEffectFn({ ...screenEffectConfig.config, scene: this.cutscene }, () => {
      this.cutscene.canGoToNextState = true
      onEndCb()
    })
  }
}
