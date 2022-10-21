import { BehaviorStatus } from '~/core/behavior-tree/BehaviorStatus'
import { BehaviorTreeNode } from '~/core/behavior-tree/BehaviorTreeNode'
import { Blackboard } from '~/core/behavior-tree/Blackboard'
import { Unit } from '~/core/units/Unit'
import { UnitTypes } from '~/core/units/UnitConstants'
import { GameConstants } from '~/scenes/game/GameConstants'
import { BlackboardKeys } from '../BlackboardKeys'

export class MoveUnitNextToTarget extends BehaviorTreeNode {
  constructor(blackboard: Blackboard) {
    super('MoveUnitNextToTarget', blackboard)
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
    const squaresToAttackFrom = this.getAllSquaresToAttackTargetFrom(
      unitToMove,
      playerToTarget
    ).filter((square) => {
      const canMoveToSquare = moveableSquares.includes(`${square[0]},${square[1]}`)
      if (unitToMove.unitType === UnitTypes.RANGED) {
        return canMoveToSquare && square[2] > 1
      }
      return canMoveToSquare
    })

    // Rank the squares based on how dangerous it is (how many enemy units can attack this square)
    const attackableSquaresMapping = this.getAllPlayerUnitAttackableSquares()
    const rankedBySafety = squaresToAttackFrom.sort((a, b) => {
      const numAttackersA = this.getNumAttackers(a, attackableSquaresMapping)
      const numAttackersB = this.getNumAttackers(b, attackableSquaresMapping)
      if (numAttackersA === numAttackersB) {
        return this.getDistanceToClosestAttacker(b) - this.getDistanceToClosestAttacker(a)
      }
      return numAttackersA - numAttackersB
    })
    const squareToMoveTo = rankedBySafety[0]
    if (squareToMoveTo == null) {
      return BehaviorStatus.FAILURE
    }
    unitToMove.moveToRowColPosition(squareToMoveTo[0], squareToMoveTo[1])
    unitToMove.focusCamera()
    return BehaviorStatus.SUCCESS
  }

  getDistanceToClosestAttacker(pos: number[]) {
    let distToClosestAttacker = Number.MAX_SAFE_INTEGER
    const playerUnits = this.blackboard.getData(BlackboardKeys.PLAYER_UNITS) as Unit[]
    playerUnits.forEach((unit) => {
      const gridPos = unit.getRowCol()
      const distance = Math.abs(pos[0] - gridPos.row) + Math.abs(pos[1] - gridPos.col)
      distToClosestAttacker = Math.min(distance, distToClosestAttacker)
    })
    return distToClosestAttacker
  }

  getAllPlayerUnitAttackableSquares() {
    const playerUnits = this.blackboard.getData(BlackboardKeys.PLAYER_UNITS) as Unit[]
    const mapping = {}
    playerUnits.forEach((unit: Unit, index) => {
      mapping[`${unit.name}-${index}`] = new Set(
        unit.getAttackableSquaresPreMove().map((square) => `${square[0]},${square[1]}`)
      )
    })
    return mapping
  }

  getNumAttackers(square: number[], mapping: { [key: string]: Set<string> }) {
    let numAttackers = 0
    Object.keys(mapping).forEach((key) => {
      const attackableSquares = mapping[key]
      if (attackableSquares.has(`${square[0]},${square[1]}`)) {
        numAttackers++
      }
    })
    return numAttackers
  }

  getAllSquaresToAttackTargetFrom(attacker: Unit, target: Unit) {
    const targetPosition = target.getRowCol()
    const queue = [[targetPosition.row, targetPosition.col, 0]]
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]
    const seen = new Set()
    const squares: number[][] = []
    while (queue.length > 0) {
      const nextPos = queue.shift()!
      if (!seen.has(`${nextPos[0]},${nextPos[1]}`)) {
        squares.push(nextPos)
        seen.add(`${nextPos[0]},${nextPos[1]}`)
        directions.forEach((dir) => {
          const newRow = dir[0] + nextPos[0]
          const newCol = dir[1] + nextPos[1]
          const newDist = nextPos[2] + 1
          if (target.isPosWithinGridBounds(newRow, newCol) && newDist <= attacker.attackRange) {
            queue.push([newRow, newCol, newDist])
          }
        })
      }
    }
    return squares
  }
}
