export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.loadUnits()
    this.loadCursor()
    this.loadTilemap()
    this.loadAnimations()
  }

  loadUnits() {
    this.load.image('rat1', 'rat1.png')
    this.load.image('rat2', 'rat2.png')
  }

  loadCursor() {
    this.load.image('cursor', 'cursor.png')
  }

  loadTilemap() {
    this.load.tilemapTiledJSON('sample-map', 'sample-map.json')
    this.load.image('tilemap_packed', 'tilemap_packed.png')
  }

  loadAnimations() {
    this.load.atlas('slash', 'animations/slash.png', 'animations/slash.json')
  }

  create() {
    this.scene.start('game')
    this.scene.start('ui')
  }
}
