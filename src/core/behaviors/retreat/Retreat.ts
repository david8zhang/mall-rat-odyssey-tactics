import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { Unit } from '~/core/units/Unit'
import { BlackboardKeys } from '../BlackboardKeys'

export class Retreat extends BehaviorTreeNode {
  constructor(blackboard: Blackboard) {
    super('Retreat', blackboard)
  }

  public process(): BehaviorStatus {
    // right now, just have the unit stay where they are
    const unitToMove = this.blackboard.getData(BlackboardKeys.CURR_UNIT_TO_MOVE) as Unit
    const rowCol = unitToMove.getRowCol()
    unitToMove.moveToRowColPosition(rowCol.row, rowCol.col)
    const onActionCallback = this.blackboard.getData(
      BlackboardKeys.ON_UNIT_MOVE_COMPLETE_CB
    ) as Function
    if (onActionCallback) {
      onActionCallback()
    }
    return BehaviorStatus.SUCCESS
  }
}
