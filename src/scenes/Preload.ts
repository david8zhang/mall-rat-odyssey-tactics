export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('rat1', 'rat1.png')
    this.load.image('rat2', 'rat2.png')
  }

  create() {
    this.scene.start('game')
  }
}
