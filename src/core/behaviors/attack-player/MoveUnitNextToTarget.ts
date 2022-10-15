import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { Unit } from '~/core/units/Unit'
import { UnitTypes } from '~/core/units/UnitConstants'
import { BlackboardKeys } from '../BlackboardKeys'

export class MoveUnitNextToTarget extends BehaviorTreeNode {
  constructor(blackboard: Blackboard) {
    super('AttackPlayerUnit', blackboard)
  }

  private shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
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

    // If the unit type is ranged, we want to move within 2 spots of the attack target, as ranged units are not able to attack
    // units that are directly next to them
    const directions =
      unitToMove.unitType === UnitTypes.PHYSICAL
        ? [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
          ]
        : [
            [0, 2],
            [2, 0],
            [-2, 0],
            [0, -2],
          ]
    const shuffledDirections = this.shuffle(directions)
    let squareToMoveTo: number[] | null = null
    shuffledDirections.forEach((direction) => {
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
