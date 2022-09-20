export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('rat1', 'rat1.png')
    this.load.image('rat2', 'rat2.png')
    this.load.tilemapTiledJSON('sample-map', 'sample-map.json')
    this.load.image('tilemap_packed', 'tilemap_packed.png')
    this.load.image('cursor', 'cursor.png')
  }

  create() {
    this.scene.start('game')
    this.scene.start('ui')
  }
}
