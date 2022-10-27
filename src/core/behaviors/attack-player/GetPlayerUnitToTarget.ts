import { Grid } from '~/core/Grid'
import { BehaviorStatus } from '../../behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '../../behavior-tree/BehaviorTreeNode'
import { Blackboard } from '../../behavior-tree/Blackboard'
import { Unit } from '../../units/Unit'
import { BlackboardKeys } from '../BlackboardKeys'

export class GetPlayerUnitToTarget extends BehaviorTreeNode {
  constructor(blackboard: Blackboard) {
    super('GetPlayerUnitToTarget', blackboard)
  }

  public process(): BehaviorStatus {
    let playerUnits = this.blackboard.getData(BlackboardKeys.PLAYER_UNITS) as Unit[]
    const currentUnitToMove = this.blackboard.getData(BlackboardKeys.CURR_UNIT_TO_MOVE) as Unit
    const moveableSquares = new Set(
      currentUnitToMove.getMoveableSquares().map((square) => `${square[0]},${square[1]}`)
    )
    const playerUnitsInRange = playerUnits.filter((unit: Unit) => {
      const gridRowCol = unit.getRowCol()
      const squaresToAttackFrom = this.getSquaresToAttackTargetFrom(
        gridRowCol.row,
        gridRowCol.col,
        currentUnitToMove.attackRange,
        unit.game.grid
      )
      // If squares to attack from are within the moveable squares, this player is targetable
      const square = squaresToAttackFrom.find((sq) => moveableSquares.has(`${sq[0]},${sq[1]}`))
      return square !== undefined
    })
    if (playerUnitsInRange.length === 0) {
      return BehaviorStatus.FAILURE
    } else {
      const bestTarget = playerUnitsInRange.sort((a, b) => a.currHealth - b.currHealth)[0]
      this.blackboard.setData(BlackboardKeys.PLAYER_UNIT_TO_TARGET, bestTarget)
    }
    return BehaviorStatus.SUCCESS
  }

  public getSquaresToAttackTargetFrom(row: number, col: number, attackRange: number, grid: Grid) {
    var queue: number[][] = [[row, col, 0]]
    var seen = new Set()
    var result: number[][] = []
    var directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]
    while (queue.length > 0) {
      const node = queue.shift()
      if (node && !seen.has(`${node[0]},${node[1]}`)) {
        result.push(node)
        seen.add(`${node[0]},${node[1]}`)
        directions.forEach((dir) => {
          var newRow = node[0] + dir[0]
          var newCol = node[1] + dir[1]
          var newDistance = node[2] + 1
          if (newDistance <= attackRange && grid.withinBounds(newRow, newCol)) {
            queue.push([newRow, newCol, newDistance])
          }
        })
      }
    }
    return result
  }
}
