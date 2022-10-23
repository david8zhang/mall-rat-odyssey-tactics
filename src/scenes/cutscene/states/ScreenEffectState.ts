import { GameConstants } from '~/scenes/game/GameConstants'
import { Cutscene } from '../Cutscene'
import { CutsceneState } from './CutsceneState'

export enum ScreenEffects {
  FLASH_COLOR = 'FLASH_COLOR',
  SHAKE_COLOR = 'SHAKE_COLOR',
}

export interface ScreenEffectConfig {
  effectType: ScreenEffects
  config: any
}

export class ScreenEffectState extends CutsceneState {
  public static readonly SCREEN_EFFECT_MAPPING = {
    [ScreenEffects.FLASH_COLOR]: ScreenEffectState.flashColor,
    [ScreenEffects.SHAKE_COLOR]: ScreenEffectState.shakeWithColor,
  }

  public static flashColor(config: any, onCompleteCb: Function) {
    const scene = config.scene as Cutscene
    const invisibleRectangle = scene.add
      .rectangle(
        GameConstants.GAME_WIDTH / 2,
        GameConstants.GAME_HEIGHT / 2,
        GameConstants.GAME_WIDTH,
        GameConstants.GAME_HEIGHT,
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

  public static shakeWithColor(config: any, onCompletedCb: Function) {
    const scene = config.scene as Cutscene
    const invisibleRectangle = scene.add
      .rectangle(
        GameConstants.GAME_WIDTH / 2,
        GameConstants.GAME_HEIGHT / 2,
        GameConstants.GAME_WIDTH,
        GameConstants.GAME_HEIGHT,
        config.color
      )
      .setVisible(true)
      .setDepth(1000)
      .setAlpha(0.5)
    scene.cameras.main.shake(1000, 0.005, false, (_, progress) => {
      if (progress == 1) {
        scene.tweens.add({
          targets: [invisibleRectangle],
          alpha: {
            from: 0.5,
            to: 0,
          },
          duration: 500,
          onComplete: () => {
            invisibleRectangle.destroy()
            onCompletedCb()
          },
        })
      }
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
