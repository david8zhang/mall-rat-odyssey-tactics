import { Cutscene } from '../Cutscene'

export abstract class CutsceneState {
  public cutscene: Cutscene
  constructor(cutscene: Cutscene) {
    this.cutscene = cutscene
  }

  public abstract processState(onEndCb: Function, ...args: any): void
}
