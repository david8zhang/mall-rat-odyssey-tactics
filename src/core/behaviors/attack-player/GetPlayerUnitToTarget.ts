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
    const attackableSquares = new Set(
      currentUnitToMove.getAttackableSquaresPreMove().map((cellCoords) => {
        return `${cellCoords[0]},${cellCoords[1]}`
      })
    )
    const playerUnitsInRange = playerUnits.filter((unit: Unit) => {
      const gridRowCol = unit.getRowCol()
      return attackableSquares.has(`${gridRowCol.row},${gridRowCol.col}`)
    })
    if (playerUnitsInRange.length === 0) {
      return BehaviorStatus.FAILURE
    } else {
      const bestTarget = playerUnitsInRange.sort((a, b) => a.currHealth - b.currHealth)[0]
      this.blackboard.setData(BlackboardKeys.PLAYER_UNIT_TO_TARGET, bestTarget)
    }
    return BehaviorStatus.SUCCESS
  }
}
