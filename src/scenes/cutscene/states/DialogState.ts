import { Cutscene } from '../Cutscene'
import { CutSceneDialogLine } from '../CutsceneConstants'
import { CutsceneOverlay } from '../CutsceneOverlay'
import { CutsceneState } from './CutsceneState'

export class DialogState extends CutsceneState {
  constructor(cutscene: Cutscene) {
    super(cutscene)
  }

  public processState(onEndCb: Function, dialogLines: CutSceneDialogLine[]): void {
    if (dialogLines && dialogLines.length > 0) {
      this.cutscene.canGoToNextState = false
      CutsceneOverlay.instance.setDialogLines(dialogLines)
      CutsceneOverlay.instance.setOnDialogFinishedCallback(() => {
        this.cutscene.canGoToNextState = true
        onEndCb()
      })
      CutsceneOverlay.instance.showNextDialogLine()
    }
  }
}
