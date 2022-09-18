import Phaser from 'phaser'

import Game from './scenes/Game'
import { Preload } from './scenes/Preload'
import { UI } from './scenes/UI'
import { GameConstants } from './utils/GameConstants'

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
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preload, Game, UI],
}

export default new Phaser.Game(config)
