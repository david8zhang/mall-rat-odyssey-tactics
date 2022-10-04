import { SAMPLE_CUTSCENE } from '~/utils/CutsceneConstants'
import { CHICANERY_COPYPASTA } from '~/utils/DialogConstants'

export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.loadUnits()
    this.loadCursor()
    this.loadTilemap()
    this.loadAnimations()
    this.loadDialogUI()
  }

  loadUnits() {
    this.load.image('rat1', 'rat1.png')
    this.load.image('rat2', 'rat2.png')
    this.load.image('rat-dialog', 'rat-dialog.png')
  }

  loadDialogUI() {
    this.load.image(
      'nextPage',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png'
    )
  }

  loadCursor() {
    this.load.image('cursor', 'cursor.png')
  }

  loadTilemap() {
    this.load.tilemapTiledJSON('sample-map', 'sample-map.json')
    this.load.tilemapTiledJSON('cutscene-map', 'cutscene-map.json')
    this.load.image('tilemap_packed', 'tilemap_packed.png')
  }

  loadAnimations() {
    this.load.atlas('slash', 'animations/slash.png', 'animations/slash.json')
  }

  create() {
    // this.scene.start('game')
    // this.scene.start('ui')
    // this.scene.start('dialog', CHICANERY_COPYPASTA)
    this.scene.start('cutscene', SAMPLE_CUTSCENE)
  }
}
