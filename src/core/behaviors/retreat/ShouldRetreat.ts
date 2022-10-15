import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { Unit } from '~/core/units/Unit'
import { BlackboardKeys } from '../BlackboardKeys'

export class ShouldRetreat extends BehaviorTreeNode {
  private static LOW_HEALTH_THRESHOLD_PCT = 0.5

  constructor(blackboard: Blackboard) {
    super('ShouldRetreat', blackboard)
  }

  public process(): BehaviorStatus {
    const unitToMove = this.blackboard.getData(BlackboardKeys.CURR_UNIT_TO_MOVE) as Unit
    console.log(unitToMove)
    if (!unitToMove) {
      return BehaviorStatus.FAILURE
    }
    const lowHealthAmt = Math.round(unitToMove.maxHealth * ShouldRetreat.LOW_HEALTH_THRESHOLD_PCT)
    return unitToMove.currHealth <= lowHealthAmt ? BehaviorStatus.SUCCESS : BehaviorStatus.FAILURE
  }
}
