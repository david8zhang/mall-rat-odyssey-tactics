import Game from '~/scenes/game/Game'
import { BehaviorStatus } from '../behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '../behavior-tree/BehaviorTreeNode'
import { Blackboard } from '../behavior-tree/Blackboard'
import { CPU } from '../CPU'
import { BlackboardKeys } from './BlackboardKeys'

export class PopulateBlackboard extends BehaviorTreeNode {
  private cpu: CPU

  constructor(blackboard: Blackboard, cpu: CPU) {
    super('PopulateBlackboard', blackboard)
    this.cpu = cpu
  }

  public process(): BehaviorStatus {
    this.blackboard.setData(BlackboardKeys.CURR_UNIT_TO_MOVE, this.cpu.unitToMove)
    this.blackboard.setData(BlackboardKeys.PLAYER_UNITS, Game.instance.player.getLivingUnits())
    this.blackboard.setData(BlackboardKeys.ON_UNIT_MOVE_COMPLETE_CB, () => {
      this.cpu.onUnitMoveComplete()
    })
    return BehaviorStatus.SUCCESS
  }
}
