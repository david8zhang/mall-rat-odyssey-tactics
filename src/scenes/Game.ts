import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  constructor() {
    super('game')
  }

  create() {
    const rat = this.add.sprite(100, 100, 'rat1')
  }
}
