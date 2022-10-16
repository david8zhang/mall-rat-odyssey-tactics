import { CutsceneState } from './CutsceneState'

export enum AnimationTypes {
  JUMP_UP_AND_DOWN = 'JUMP_UP_AND_DOWN',
  SHAKE_SIDE_TO_SIDE = 'SHAKE_SIDE_TO_SIDE',
  FADE_OUT = 'FADE_OUT',
}

export interface SpriteAnimConfig {
  [charKey: string]: {
    sortOrder: number
    animType: AnimationTypes
    delay?: number
  }
}

export class AnimateSpriteState extends CutsceneState {
  public static readonly ANIM_FUNCTION_MAPPING = {
    [AnimationTypes.JUMP_UP_AND_DOWN]: AnimateSpriteState.jumpUpAndDown,
    [AnimationTypes.SHAKE_SIDE_TO_SIDE]: AnimateSpriteState.shakeSideToSide,
    [AnimationTypes.FADE_OUT]: AnimateSpriteState.fadeOut,
  }

  public static fadeOut(targetSprite: Phaser.GameObjects.Sprite, onCompleteCb: Function) {
    return {
      targets: targetSprite,
      alpha: {
        from: 1,
        to: 0,
      },
      duration: 300,
      onComplete: () => {
        onCompleteCb()
      },
    }
  }

  public static shakeSideToSide(targetSprite: Phaser.GameObjects.Sprite, onCompleteCb: Function) {
    return {
      targets: targetSprite,
      x: {
        from: targetSprite.x - 2,
        to: targetSprite.x + 2,
      },
      duration: 50,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        onCompleteCb()
      },
    }
  }

  public static jumpUpAndDown(
    targetSprite: Phaser.GameObjects.Sprite,
    onCompleteCb: Function
  ): any {
    return {
      targets: targetSprite,
      y: {
        from: targetSprite.y,
        to: targetSprite.y - 5,
      },
      duration: 100,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        onCompleteCb()
      },
    }
  }

  public processState(onEndCb: Function, spriteAnimConfig: SpriteAnimConfig): void {
    const characterKeys = Object.keys(spriteAnimConfig).sort((a, b) => {
      return spriteAnimConfig[a].sortOrder - spriteAnimConfig[b].sortOrder
    })
    this.cutscene.canGoToNextState = false
    characterKeys.forEach((charKey: string, index: number) => {
      const animConfig = spriteAnimConfig[charKey]
      const tweenFn = AnimateSpriteState.ANIM_FUNCTION_MAPPING[animConfig.animType]
      const characterSprite = this.cutscene.characterSpriteMapping[charKey]
      const tweenConfig = tweenFn(characterSprite, () => {
        if (index === characterKeys.length - 1) {
          this.cutscene.canGoToNextState = true
          onEndCb()
        }
      })
      if (animConfig.delay) {
        tweenConfig.delay = animConfig.delay
      }
      this.cutscene.tweens.add(tweenConfig)
    })
  }
}
