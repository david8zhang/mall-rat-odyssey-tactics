import Phaser from 'phaser'
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { Cutscene } from './scenes/cutscene/Cutscene'
import { CutsceneOverlay } from './scenes/cutscene/CutsceneOverlay'

import { Dialog } from './scenes/dialog/Dialog'
import Game from './scenes/game/Game'
import { Preload } from './scenes/Preload'
import { SceneController } from './scenes/SceneController'
import { GameUI } from './scenes/game/GameUI'
import { GameConstants } from './scenes/game/GameConstants'
import { Overworld } from './scenes/overworld/Overworld'
import { GameFinished } from './scenes/GameFinishedScene'
import { Start } from './scenes/StartScene'

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
  scene: [
    Preload,
    Start,
    SceneController,
    Dialog,
    Cutscene,
    CutsceneOverlay,
    Game,
    GameUI,
    Overworld,
    GameFinished,
  ],
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
