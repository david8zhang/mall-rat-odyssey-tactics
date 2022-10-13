import { CutsceneCharacterConfig } from '~/utils/CutsceneConstants'
import { Cutscene } from '../Cutscene'
import { CutsceneState } from './CutsceneState'

export class CharacterMoveState extends CutsceneState {
  constructor(cutscene: Cutscene) {
    super(cutscene)
  }

  public processState(onEndCb: Function, characterConfig: CutsceneCharacterConfig): void {
    const characterConfigKeys = Object.keys(characterConfig)
    this.cutscene.canGoToNextState = false
    characterConfigKeys.forEach((charKey: string, index: number) => {
      const currCharacterState = characterConfig[charKey]
      this.moveToNewCell(currCharacterState, this.cutscene.characterSpriteMapping[charKey], () => {
        if (index === characterConfigKeys.length - 1) {
          this.cutscene.canGoToNextState = true
          onEndCb()
        }
      })
    })
  }

  moveToNewCell(
    currCharacterState: any,
    spriteTarget: Phaser.GameObjects.Sprite,
    onCompleteCb: Function
  ) {
    // Travel from old cell to new cell (horizontally, then vertically)
    const prevCell = this.cutscene.grid.getCellAtWorldPosition(spriteTarget.x, spriteTarget.y)
    const newCellHoriz = this.cutscene.grid.getCellAtRowCol(
      currCharacterState.row,
      prevCell.gridCol
    )
    const timeDuration = Math.abs(currCharacterState.row - prevCell.gridRow) * 100
    this.cutscene.tweens.add({
      targets: spriteTarget,
      x: { from: prevCell.centerX, to: newCellHoriz.centerX },
      y: { from: prevCell.centerY, to: newCellHoriz.centerY },
      duration: timeDuration,
      onComplete: () => {
        const newCellVert = this.cutscene.grid.getCellAtRowCol(
          currCharacterState.row,
          currCharacterState.col
        )
        const timeDuration = Math.abs(currCharacterState.col - prevCell.gridCol) * 100
        this.cutscene.tweens.add({
          targets: spriteTarget,
          x: { from: newCellHoriz.centerX, to: newCellVert.centerX },
          y: { from: newCellHoriz.centerY, to: newCellVert.centerY },
          duration: timeDuration,
          onComplete: () => {
            onCompleteCb()
          },
        })
      },
    })
  }
}
