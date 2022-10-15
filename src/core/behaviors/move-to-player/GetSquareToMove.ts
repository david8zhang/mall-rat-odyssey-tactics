import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { Unit } from '~/core/units/Unit'
import { BlackboardKeys } from '../BlackboardKeys'

export class GetSquareToMove extends BehaviorTreeNode {
  constructor(blackboard: Blackboard) {
    super('GetSquareToMove', blackboard)
  }

  public process(): BehaviorStatus {
    const playerUnits = this.blackboard.getData(BlackboardKeys.PLAYER_UNITS) as Unit[]
    const currUnitToMove = this.blackboard.getData(BlackboardKeys.CURR_UNIT_TO_MOVE) as Unit

    // Current logic is just to move to the square closest to the closest enemy player unit
    const currUnitGridRowCol = currUnitToMove.getRowCol()
    let closestPlayerUnit = playerUnits.sort((a, b) => {
      const rowColA = a.getRowCol()
      const rowColB = b.getRowCol()
      const distA = this.getManhattanDistance(rowColA, currUnitGridRowCol)
      const distB = this.getManhattanDistance(rowColB, currUnitGridRowCol)
      return distA - distB
    })[0]
    if (!closestPlayerUnit) {
      return BehaviorStatus.FAILURE
    }

    const closestPlayerUnitRowCol = closestPlayerUnit.getRowCol()
    const moveableSquares = currUnitToMove.getMoveableSquares()
    const squareToMoveTo = moveableSquares.sort((a, b) => {
      const rowColA = { row: a[0], col: a[1] }
      const rowColB = { row: b[0], col: b[1] }
      const distA = this.getManhattanDistance(rowColA, closestPlayerUnitRowCol)
      const distB = this.getManhattanDistance(rowColB, closestPlayerUnitRowCol)
      return distA - distB
    })[0]
    if (!squareToMoveTo) {
      return BehaviorStatus.FAILURE
    }
    this.blackboard.setData(BlackboardKeys.SQUARE_TO_MOVE, squareToMoveTo)
    return BehaviorStatus.SUCCESS
  }

  private getManhattanDistance(
    rowColA: { row: number; col: number },
    rowColB: { row: number; col: number }
  ): number {
    return Math.abs(rowColA.row - rowColB.row) + Math.abs(rowColA.col - rowColB.col)
  }
}
