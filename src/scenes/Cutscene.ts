export interface CutsceneConfig {}

export class Cutscene extends Phaser.Scene {
  constructor() {
    super('cutscene')
  }

  init(data: CutsceneConfig) {}
}
