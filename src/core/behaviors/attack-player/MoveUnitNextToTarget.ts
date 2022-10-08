import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { Unit } from '~/core/Unit'
import { BlackboardKeys } from '../BlackboardKeys'

export class MoveUnitNextToTarget extends BehaviorTreeNode {
  constructor(blackboard: Blackboard) {
    super('AttackPlayerUnit', blackboard)
  }

  public process(): BehaviorStatus {
    const playerToTarget = this.blackboard.getData(BlackboardKeys.PLAYER_UNIT_TO_TARGET)
    if (!playerToTarget) {
      return BehaviorStatus.FAILURE
    }
    const unitToMove = this.blackboard.getData(BlackboardKeys.CURR_UNIT_TO_MOVE) as Unit
    const moveableSquares = unitToMove
      .getMoveableSquares()
      .map((square) => `${square[0]},${square[1]}`)
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]
    let squareToMoveTo: number[] | null = null
    directions.forEach((direction) => {
      const { row, col } = playerToTarget.getRowCol()
      const newRow = row + direction[0]
      const newCol = col + direction[1]
      if (moveableSquares.includes(`${newRow},${newCol}`)) {
        squareToMoveTo = [newRow, newCol]
      }
    })
    if (squareToMoveTo == null) {
      return BehaviorStatus.FAILURE
    }
    unitToMove.moveToRowColPosition(squareToMoveTo[0], squareToMoveTo[1])
    return BehaviorStatus.SUCCESS
  }
}
