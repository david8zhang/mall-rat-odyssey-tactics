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
    this.load.image('dottie', 'dottie.png')
    this.load.image('pippin', 'pippin.png')
    this.load.image('pt-boss', 'pt-boss.png')
    this.load.image('pop-topic-soldier', 'pop-topic-soldier.png')
    this.load.image('dropp', 'dropp.png')
    this.load.image('copp', 'copp.png')
    this.load.image('shoe-castle-soldier', 'shoe-castle-soldier.png')
    this.load.image('mac', 'mac.png')
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
    this.load.tilemapTiledJSON('sample-map', 'tilemaps/sample-map.json')
    this.load.tilemapTiledJSON('cutscene-map', 'tilemaps/cutscene-map.json')
    this.load.tilemapTiledJSON('pop-topic-map', 'tilemaps/pop-topic-map.json')
    this.load.image('tilemap_packed', 'tilemaps/tilemap_packed.png')
  }

  loadAnimations() {
    this.load.atlas('slash', 'animations/slash.png', 'animations/slash.json')
  }

  create() {
    this.scene.start('scene-controller')
    // this.scene.start('game', SAMPLE_GAME)
    // this.scene.start('game-ui')
  }
}
