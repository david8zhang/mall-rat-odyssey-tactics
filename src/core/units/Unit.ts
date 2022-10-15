import Game from '~/scenes/game/Game'
import { GameConstants } from '~/scenes/game/GameConstants'
import { GameUI, ShowAttackModalConfig } from '~/scenes/game/GameUI'
import { UnitTypes } from './UnitConstants'

export interface UnitConfig {
  texture: string
  position: {
    x: number
    y: number
  }
  moveRange: number
  attackRange: number // Additive to move range (i.e. attack range of 1 and move range of 4 = effective attack range of 5)
  baseDamageAmount: number
  maxHealth: number
  name: string
  unitType: UnitTypes
}

export class Unit {
  public sprite: Phaser.GameObjects.Sprite
  private game: Game
  private moveRange: number
  private attackRange: number
  private baseDamageAmount: number

  public moveableSquares: Phaser.GameObjects.Rectangle[] = []
  public possibleAttackableSquares: Phaser.GameObjects.Rectangle[] = []
  public attackableSquaresPostMove: Phaser.GameObjects.Rectangle[] = []
  public hasMoved: boolean = false
  public isDead: boolean = false
  public unitType: UnitTypes

  public currHealth: number
  public maxHealth: number
  public name: string

  constructor(game: Game, unitConfig: UnitConfig) {
    this.game = game
    this.sprite = this.game.add
      .sprite(unitConfig.position.x, unitConfig.position.y, unitConfig.texture)
      .setDepth(5)
    this.moveRange = unitConfig.moveRange
    this.attackRange = unitConfig.attackRange
    this.baseDamageAmount = unitConfig.baseDamageAmount
    this.maxHealth = unitConfig.maxHealth
    this.currHealth = this.maxHealth
    this.name = unitConfig.name
    this.unitType = unitConfig.unitType
  }

  public highlight() {
    this.sprite.setTint(0xffff00)
    this.highlightMoveableSquares()
  }

  takeDamage(damage: number) {
    this.currHealth = Math.max(this.currHealth - damage, 0)
  }

  // TODO: Modify damage dealt based on attributes or something
  calcDamageDealt(): number {
    return this.baseDamageAmount
  }

  die() {
    this.sprite.setVisible(false)
    this.isDead = true
  }

  getAttackableSquaresPreMove() {
    const attackableSquares: number[][] = []
    const cell = this.game.grid.getCellAtWorldPosition(this.sprite.x, this.sprite.y)
    const currCoordinates = [cell.gridRow, cell.gridCol, 0]
    const queue = [currCoordinates]
    const seen = new Array(this.game.grid.numRows)
      .fill(false)
      .map(() => new Array(this.game.grid.numCols).fill(false))
    while (queue.length > 0) {
      const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]
      const currNode = queue.shift()
      if (currNode && !seen[currNode[0]][currNode[1]]) {
        seen[currNode[0]][currNode[1]] = true
        attackableSquares.push([currNode[0], currNode[1]])
        directions.forEach((dir) => {
          const newRow = currNode[0] + dir[0]
          const newCol = currNode[1] + dir[1]
          const newDistance = currNode[2] + 1
          // Add 1 to attack range if the unit is ranged. (Ranged cannot attack squares directly next to them)
          let distanceToCompare = this.moveRange + this.attackRange
          if (this.unitType === UnitTypes.RANGED) {
            distanceToCompare++
          }
          if (this.game.grid.withinBounds(newRow, newCol) && newDistance <= distanceToCompare) {
            if (!this.wallTileAtPosition(newRow, newCol)) {
              queue.push([newRow, newCol, newDistance])
            }
          }
        })
      }
    }
    return attackableSquares
  }

  highlightOnlyAttackableSquares() {
    this.attackableSquaresPostMove.forEach((square) => {
      square.setVisible(true)
    })
    this.moveableSquares.forEach((square) => {
      square.setVisible(false)
    })
    this.possibleAttackableSquares.forEach((square) => {
      square.setVisible(false)
    })
  }

  getMoveableSquares(): number[][] {
    const moveableSquares: number[][] = []
    const cell = this.game.grid.getCellAtWorldPosition(this.sprite.x, this.sprite.y)
    const currCoordinates = [cell.gridRow, cell.gridCol, 0]
    const queue = [currCoordinates]
    const seen = new Array(this.game.grid.numRows)
      .fill(false)
      .map(() => new Array(this.game.grid.numCols).fill(false))
    while (queue.length > 0) {
      const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]
      const currNode = queue.shift()
      if (currNode && !seen[currNode[0]][currNode[1]]) {
        seen[currNode[0]][currNode[1]] = true
        moveableSquares.push([currNode[0], currNode[1]])
        directions.forEach((dir) => {
          const newRow = currNode[0] + dir[0]
          const newCol = currNode[1] + dir[1]
          const newDistance = currNode[2] + 1
          if (this.game.grid.withinBounds(newRow, newCol) && newDistance <= this.moveRange) {
            if (!this.wallTileAtPosition(newRow, newCol)) {
              queue.push([newRow, newCol, newDistance])
            }
          }
        })
      }
    }
    return moveableSquares.filter((square: number[]) => {
      return !this.game.unitAtPosition(square[0], square[1], this)
    })
  }

  highlightMoveableSquares() {
    const moveableSquares = this.getMoveableSquares()
    moveableSquares.forEach((moveableSquare) => {
      const [i, j] = moveableSquare
      const cell = this.game.grid.getCellAtRowCol(i, j)
      const newRect = this.game.add
        .rectangle(
          cell.centerX,
          cell.centerY,
          GameConstants.TILE_SIZE,
          GameConstants.TILE_SIZE,
          0x0000ff,
          0.25
        )
        .setDepth(this.sprite.depth - 1)
      this.moveableSquares.push(newRect)
    })
  }

  wallTileAtPosition(row: number, col: number) {
    const tile = this.game.tileMap.getTileAt(col, row)
    if (!tile) {
      return false
    }
    return tile.layer.name === 'Walls'
  }

  public getAttackableSquaresPostMove() {
    const attackableSquaresPostMove: number[][] = []
    const cell = this.game.grid.getCellAtWorldPosition(this.sprite.x, this.sprite.y)
    const currCoordinates = [cell.gridRow, cell.gridCol, 0]
    const queue = [currCoordinates]
    const seen = new Array(this.game.grid.numRows)
      .fill(-1)
      .map(() => new Array(this.game.grid.numCols).fill(-1))
    while (queue.length > 0) {
      const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]
      const currNode = queue.shift()
      if (currNode && seen[currNode[0]][currNode[1]] == -1) {
        seen[currNode[0]][currNode[1]] = currNode[2]
        directions.forEach((dir) => {
          const newRow = currNode[0] + dir[0]
          const newCol = currNode[1] + dir[1]
          const newDistance = currNode[2] + 1

          // Add 1 to attack range if the unit is ranged. (Ranged cannot attack squares directly next to them)
          const attackRange =
            this.unitType === UnitTypes.RANGED ? this.attackRange + 1 : this.attackRange
          if (this.game.grid.withinBounds(newRow, newCol) && newDistance <= attackRange) {
            if (!this.wallTileAtPosition(newRow, newCol)) {
              queue.push([newRow, newCol, newDistance])
            }
          }
        })
      }
    }
    for (let i = 0; i < seen.length; i++) {
      for (let j = 0; j < seen[0].length; j++) {
        if (seen[i][j] != -1) {
          if (this.unitType === UnitTypes.RANGED && seen[i][j] <= 1) {
            continue
          }
          attackableSquaresPostMove.push([i, j])
        }
      }
    }
    return attackableSquaresPostMove
  }

  public saveAttackableSquaresPostMove() {
    const attackableSquaresPostMove = this.getAttackableSquaresPostMove()
    attackableSquaresPostMove.forEach((coord: number[]) => {
      const cell = this.game.grid.getCellAtRowCol(coord[0], coord[1])
      const newRect = this.game.add
        .rectangle(
          cell.centerX,
          cell.centerY,
          GameConstants.TILE_SIZE,
          GameConstants.TILE_SIZE,
          0xff0000,
          0.25
        )
        .setVisible(false)
        .setDepth(this.sprite.depth - 1)
      this.attackableSquaresPostMove.push(newRect)
    })
  }

  public hasTargetWithinRange(target: Unit): boolean {
    const attackableSquaresPostMove = this.getAttackableSquaresPostMove()
    for (let i = 0; i < attackableSquaresPostMove.length; i++) {
      const square = attackableSquaresPostMove[i]
      const targetGridPos = target.getRowCol()
      if (targetGridPos.row == square[0] && targetGridPos.col == square[1]) {
        return true
      }
    }
    return false
  }

  public attackTarget(target: Unit, onComplete: Function) {
    const damageDealt = this.calcDamageDealt()
    const counterAttackDmg = target.calcDamageDealt()

    // Check if the attacker is within the defenders attack range
    const canDefenderCounter = target.hasTargetWithinRange(this)
    GameUI.instance.hideUnitStats()
    const config: ShowAttackModalConfig = {
      attacker: this,
      defender: target,
      canDefenderCounter,
      damageDealt,
      counterDamageDealt: counterAttackDmg,
      onCounterAttackCb: () => {
        this.takeDamage(counterAttackDmg)
      },
      onAttackCb: (attacker: Unit, defender: Unit) => {
        defender.takeDamage(damageDealt)
      },
      onEndCb: () => {
        onComplete()
      },
    }
    GameUI.instance.showAttackModalAndPlayAttackAnimation(config)
  }

  public dehighlight() {
    this.sprite.clearTint()
    this.moveableSquares.forEach((square) => {
      square.setVisible(false)
    })
    this.attackableSquaresPostMove.forEach((square) => {
      square.setVisible(false)
    })
  }

  private completeMove() {
    this.sprite.setTint(0x777777)
    this.moveableSquares.forEach((square) => {
      square.destroy()
    })
    this.possibleAttackableSquares.forEach((square) => {
      square.destroy()
    })
    this.attackableSquaresPostMove.forEach((square) => {
      square.destroy()
    })
    this.attackableSquaresPostMove = []
    this.possibleAttackableSquares = []
    this.moveableSquares = []
  }

  isSquareWithinMoveableSquares(row: number, col: number) {
    for (let i = 0; i < this.moveableSquares.length; i++) {
      const square = this.moveableSquares[i]
      const cell = this.game.grid.getCellAtWorldPosition(square.x, square.y)
      if (row === cell.gridRow && col === cell.gridCol) {
        return true
      }
    }
    return false
  }

  public get x() {
    return this.sprite.x
  }

  public get y() {
    return this.sprite.y
  }

  public getRowCol() {
    const cell = this.game.grid.getCellAtWorldPosition(this.sprite.x, this.sprite.y)
    return {
      row: cell.gridRow,
      col: cell.gridCol,
    }
  }

  public moveToRowColPosition(row: number, col: number) {
    const cell = this.game.grid.getCellAtRowCol(row, col)
    this.sprite.setPosition(cell.centerX, cell.centerY)
  }

  setHasMoved(hasMoved: boolean) {
    if (hasMoved) {
      this.completeMove()
    } else {
      this.sprite.clearTint()
    }
    this.hasMoved = hasMoved
  }

  get texture() {
    return this.sprite.texture.key
  }
}
