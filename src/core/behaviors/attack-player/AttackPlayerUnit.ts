import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { CPU } from '~/core/CPU'
import { Unit } from '~/core/units/Unit'
import { BlackboardKeys } from '../BlackboardKeys'

export class AttackPlayerUnit extends BehaviorTreeNode {
  private cpu: CPU
  constructor(blackboard: Blackboard, cpu: CPU) {
    super('attackPlayerUnit', blackboard)
    this.cpu = cpu
  }

  public process(): BehaviorStatus {
    const playerUnitToTarget = this.blackboard.getData(BlackboardKeys.PLAYER_UNIT_TO_TARGET) as Unit
    const unitToMove = this.blackboard.getData(BlackboardKeys.CURR_UNIT_TO_MOVE) as Unit
    const onActionCallback = this.blackboard.getData(
      BlackboardKeys.ON_UNIT_MOVE_COMPLETE_CB
    ) as Function

    const targetGridPos = playerUnitToTarget.getRowCol()
    this.cpu.attackCrosshair.show()
    this.cpu.attackCrosshair.moveToRowCol(targetGridPos.row, targetGridPos.col)
    this.cpu.game.time.delayedCall(500, () => {
      this.cpu.attackCrosshair.hide()
      unitToMove.attackTarget(playerUnitToTarget, () => {
        if (onActionCallback) {
          onActionCallback()
        }
      })
    })
    return BehaviorStatus.SUCCESS
  }
}
