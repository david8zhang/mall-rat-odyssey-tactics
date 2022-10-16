import { Cutscene } from '../Cutscene'
import { CutsceneState } from './CutsceneState'

export interface CharacterMoveConfig {
  [charKey: string]: {
    rowDiff: number
    colDiff: number
  }
}

export class CharacterMoveState extends CutsceneState {
  constructor(cutscene: Cutscene) {
    super(cutscene)
  }

  public processState(onEndCb: Function, characterConfig: CharacterMoveConfig): void {
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
    moveConfig: { rowDiff?: number; colDiff?: number },
    spriteTarget: Phaser.GameObjects.Sprite,
    onCompleteCb: Function
  ) {
    // Travel from old cell to new cell (horizontally, then vertically)
    const rowDiff = moveConfig.rowDiff ? moveConfig.rowDiff : 0
    const colDiff = moveConfig.colDiff ? moveConfig.colDiff : 0
    const prevCell = this.cutscene.grid.getCellAtWorldPosition(spriteTarget.x, spriteTarget.y)

    // Keep the movement within bounds
    let newRow = prevCell.gridRow + rowDiff
    let newCol = prevCell.gridCol + colDiff
    if (newRow < 0) {
      newRow = 0
    } else if (newRow >= this.cutscene.grid.numRows) {
      newRow = this.cutscene.grid.numRows - 1
    }
    if (newCol < 0) {
      newCol = 0
    } else if (newCol >= this.cutscene.grid.numCols) {
      newCol = this.cutscene.grid.numCols - 1
    }

    const newCellHoriz = this.cutscene.grid.getCellAtRowCol(newRow, prevCell.gridCol)
    const timeDuration = Math.abs(newCellHoriz.gridRow - prevCell.gridRow) * 100
    this.cutscene.tweens.add({
      targets: spriteTarget,
      x: { from: prevCell.centerX, to: newCellHoriz.centerX },
      y: { from: prevCell.centerY, to: newCellHoriz.centerY },
      duration: timeDuration,
      onComplete: () => {
        const newCellVert = this.cutscene.grid.getCellAtRowCol(newCellHoriz.gridRow, newCol)
        const timeDuration = Math.abs(newCellVert.gridCol - prevCell.gridCol) * 100
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
