import { CutsceneState } from './CutsceneState'

export interface SpriteAnimConfig {}

export class AnimateSpriteState extends CutsceneState {
  public processState(onEndCb: Function, spriteAnimConfig: SpriteAnimConfig): void {}
}
