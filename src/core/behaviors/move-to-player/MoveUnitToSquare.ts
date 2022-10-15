import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { Unit } from '~/core/units/Unit'
import { BlackboardKeys } from '../BlackboardKeys'

export class MoveUnitToSquare extends BehaviorTreeNode {
  constructor(blackboard: Blackboard) {
    super('MoveUnitToSquare', blackboard)
  }

  public process(): BehaviorStatus {
    const unitToMove = this.blackboard.getData(BlackboardKeys.CURR_UNIT_TO_MOVE) as Unit
    const squareToMove = this.blackboard.getData(BlackboardKeys.SQUARE_TO_MOVE)
    unitToMove.moveToRowColPosition(squareToMove[0], squareToMove[1])
    const onActionCallback = this.blackboard.getData(
      BlackboardKeys.ON_UNIT_MOVE_COMPLETE_CB
    ) as Function
    if (onActionCallback) {
      onActionCallback()
    }
    return BehaviorStatus.SUCCESS
  }
}
