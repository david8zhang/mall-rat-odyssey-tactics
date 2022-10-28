import { GameConstants } from './game/GameConstants'

export class GameFinished extends Phaser.Scene {
  public gameFinishedText!: Phaser.GameObjects.Text

  constructor() {
    super('game-finished')
  }

  create() {
    const gameFinishedText = this.add
      .text(GameConstants.WINDOW_WIDTH / 2, GameConstants.WINDOW_HEIGHT / 2, '')
      .setStyle({
        fontSize: '20px',
        color: 'white',
      })
    gameFinishedText
      .setText('To Be Continued...')
      .setPosition(
        GameConstants.WINDOW_WIDTH / 2 - gameFinishedText.displayWidth / 2,
        GameConstants.WINDOW_HEIGHT / 2 - gameFinishedText.displayHeight / 2
      )
      .setAlpha(1)
      .setDepth(1000)
    this.tweens.add({
      targets: [gameFinishedText],
      alpha: {
        from: 0,
        to: 1,
      },
      duration: 1000,
    })
  }
}
