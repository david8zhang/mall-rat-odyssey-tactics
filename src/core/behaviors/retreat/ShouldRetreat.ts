import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { Unit } from '~/core/units/Unit'
import { BlackboardKeys } from '../BlackboardKeys'

export class ShouldRetreat extends BehaviorTreeNode {
  private static LOW_HEALTH_THRESHOLD_PCT = 0.5
  private static PLAYER_LOW_HEALTH_THRESHOLD = 0.5

  constructor(blackboard: Blackboard) {
    super('ShouldRetreat', blackboard)
  }

  public process(): BehaviorStatus {
    const unitToMove = this.blackboard.getData(BlackboardKeys.CURR_UNIT_TO_MOVE) as Unit
    const playerUnits = this.blackboard.getData(BlackboardKeys.PLAYER_UNITS) as Unit[]

    for (let i = 0; i < playerUnits.length; i++) {
      const playerUnit = playerUnits[i]

      // If there is a player unit that is low health, continue aggressiveness
      if (this.isUnitLowHealth(playerUnit, ShouldRetreat.PLAYER_LOW_HEALTH_THRESHOLD)) {
        return BehaviorStatus.FAILURE
      }
    }

    if (!unitToMove) {
      return BehaviorStatus.FAILURE
    }

    const isUnitVulnerable = this.isUnitLowHealth(
      unitToMove,
      ShouldRetreat.LOW_HEALTH_THRESHOLD_PCT
    )
    return isUnitVulnerable ? BehaviorStatus.SUCCESS : BehaviorStatus.FAILURE
  }

  private isUnitLowHealth(unit: Unit, healthThresholdPct: number) {
    const lowHealthAmt = Math.round(unit.maxHealth * healthThresholdPct)
    return unit.currHealth <= lowHealthAmt
  }
}
