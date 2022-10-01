import Phaser from 'phaser'
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

import { Dialog } from './scenes/Dialog'
import Game from './scenes/Game'
import { Preload } from './scenes/Preload'
import { UI } from './scenes/UI'
import { GameConstants } from './utils/GameConstants'

console.log(window.innerHeight)

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GameConstants.WINDOW_WIDTH,
  height: GameConstants.WINDOW_HEIGHT,
  parent: 'phaser',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preload, Dialog, Game, UI],
  plugins: {
    global: [NineSlicePlugin.DefaultCfg],
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
}

export default new Phaser.Game(config)
