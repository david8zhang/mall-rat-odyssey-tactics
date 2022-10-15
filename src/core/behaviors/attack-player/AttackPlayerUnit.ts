import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { Unit } from '~/core/units/Unit'
import { GameUI } from '~/scenes/game/GameUI'
import { BlackboardKeys } from '../BlackboardKeys'

export class AttackPlayerUnit extends BehaviorTreeNode {
  constructor(blackboard: Blackboard) {
    super('attackPlayerUnit', blackboard)
  }

  public process(): BehaviorStatus {
    const playerUnitToTarget = this.blackboard.getData(BlackboardKeys.PLAYER_UNIT_TO_TARGET) as Unit
    const unitToMove = this.blackboard.getData(BlackboardKeys.CURR_UNIT_TO_MOVE) as Unit
    const onActionCallback = this.blackboard.getData(
      BlackboardKeys.ON_UNIT_MOVE_COMPLETE_CB
    ) as Function
    unitToMove.attackTarget(playerUnitToTarget, () => {
      if (onActionCallback) {
        onActionCallback()
      }
    })
    return BehaviorStatus.SUCCESS
  }
}
