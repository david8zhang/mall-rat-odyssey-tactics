import Game, { GameOverConditions, InitialUnitConfig } from '~/scenes/game/Game'
import { AttackDirection, GameUI } from '~/scenes/game/GameUI'
import { Direction } from '~/config/Directions'
import { Side } from '~/config/Side'
import { Cursor } from './Cursor'
import { Unit } from './units/Unit'

export enum ActionState {
  SELECT_UNIT_TO_MOVE = 'select_unit_to_move',
  SELECT_MOVE_DEST = 'select_move_dest',
  SELECT_ATTACK_TARGET = 'select_attack_target',
}

export class Player {
  private game: Game
  public cursor: Cursor
  public units: Unit[] = []
  public selectedUnitToMove: Unit | null = null

  // Attacking
  public attackableEnemyUnits: Unit[] = []
  public selectedAttackableUnitIndex: number = 0

  public actionState: ActionState = ActionState.SELECT_UNIT_TO_MOVE
  public isPlayingAttackAnimation = false
  public shouldShowUnitStats: boolean = true
  public cursorFrozen: boolean = false

  constructor(game: Game, playerConfig: InitialUnitConfig[]) {
    this.game = game
    this.initUnits(playerConfig)
    this.cursor = new Cursor(this.game, {
      x: this.units[0].x,
      y: this.units[1].y,
    })
    this.initKeyboardListener()
    this.initMouseClickListener()
  }

  initMouseClickListener() {
    this.game.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.handleMouseClick(pointer)
    })
  }

  initKeyboardListener() {
    this.game.input.keyboard.on('keydown', (e) => {
      switch (e.code) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowRight':
          this.handleArrowKeyPress(e.code)
          break
        case 'Space': {
          this.handleSpaceBarPress()
          break
        }
        case 'Escape': {
          this.revertCursorToScroll()
          break
        }
      }
    })
  }

  unfreezeCursor() {
    this.cursorFrozen = false
  }

  freezeCursor() {
    this.cursorFrozen = true
  }

  hideCursor() {
    this.cursor.hide()
  }

  showCursor() {
    this.cursor.show()
  }

  revertCursorToScroll() {
    switch (this.actionState) {
      case ActionState.SELECT_ATTACK_TARGET: {
        this.completeUnitAction()
        break
      }
      case ActionState.SELECT_MOVE_DEST: {
        this.actionState = ActionState.SELECT_UNIT_TO_MOVE
        if (this.selectedUnitToMove) {
          this.selectedUnitToMove.dehighlight()
          this.selectedUnitToMove = null
        }
        break
      }
    }
  }

  handleMouseClick(pointer: Phaser.Input.Pointer) {
    switch (this.actionState) {
      case ActionState.SELECT_UNIT_TO_MOVE:
      case ActionState.SELECT_MOVE_DEST: {
        const cell = this.game.grid.getCellAtWorldPosition(pointer.worldX, pointer.worldY)
        this.moveCursorToRowCol(cell.gridRow, cell.gridCol)
        break
      }
    }
  }

  handleArrowKeyPress(arrowKeyCode: string) {
    switch (this.actionState) {
      case ActionState.SELECT_UNIT_TO_MOVE:
      case ActionState.SELECT_MOVE_DEST:
        this.moveCursorWithArrows(arrowKeyCode)
        break
      case ActionState.SELECT_ATTACK_TARGET: {
        this.scrollAttackTargets(arrowKeyCode)
      }
    }
  }

  scrollAttackTargets(arrowKeyCode: string) {
    switch (arrowKeyCode) {
      case 'ArrowUp':
      case 'ArrowRight': {
        this.selectedAttackableUnitIndex++
        this.selectedAttackableUnitIndex %= this.attackableEnemyUnits.length
        this.moveCursorToAttackableTarget()
        break
      }
      case 'ArrowDown':
      case 'ArrowLeft': {
        this.selectedAttackableUnitIndex--
        this.selectedAttackableUnitIndex %= this.attackableEnemyUnits.length
        if (this.selectedAttackableUnitIndex < 0) {
          this.selectedAttackableUnitIndex += this.attackableEnemyUnits.length
        }
        this.moveCursorToAttackableTarget()
        break
      }
    }
  }

  moveCursorToRowCol(row: number, col: number) {
    if (!this.cursorFrozen) {
      this.cursor.moveToRowCol(row, col)
      this.showStatsIfCursorHovered()
    }
  }

  moveCursorWithArrows(arrowKeyCode: string) {
    switch (arrowKeyCode) {
      case 'ArrowDown': {
        this.cursor.moveUnitsInDirection(Direction.DOWN, 1)
        break
      }
      case 'ArrowLeft': {
        this.cursor.moveUnitsInDirection(Direction.LEFT, 1)
        break
      }
      case 'ArrowRight': {
        this.cursor.moveUnitsInDirection(Direction.RIGHT, 1)
        break
      }
      case 'ArrowUp': {
        this.cursor.moveUnitsInDirection(Direction.UP, 1)
        break
      }
    }
    this.showStatsIfCursorHovered()
  }

  showStatsIfCursorHovered() {
    if (this.shouldShowUnitStats) {
      const allUnits = this.game.getAllLivingUnits()
      let isHoveredOnUnit: boolean = false
      allUnits.forEach((unit) => {
        const { row, col } = unit.getRowCol()
        const cursorRowCol = this.cursor.gridRowColPosition
        if (row === cursorRowCol.row && col === cursorRowCol.col) {
          isHoveredOnUnit = true
          GameUI.instance.hoverUnit(unit)
        }
      })
      if (!isHoveredOnUnit) {
        GameUI.instance.hideUnitStats()
      }
    }
  }

  handleAttackSelectedTarget() {
    if (!this.isPlayingAttackAnimation) {
      this.isPlayingAttackAnimation = true
      const selectedUnitToAttack = this.attackableEnemyUnits[this.selectedAttackableUnitIndex]
      this.selectedUnitToMove!.attackTarget(selectedUnitToAttack, () => {
        this.completeUnitAction()
        this.isPlayingAttackAnimation = false
      })
    }
  }

  getLivingUnits() {
    return this.units.filter((unit) => !unit.isDead)
  }

  completeUnitAction() {
    const { row, col } = this.selectedUnitToMove!.getRowCol()
    this.moveCursorToRowCol(row, col)
    this.actionState = ActionState.SELECT_UNIT_TO_MOVE
    this.cursor.clearCursorTint()
    this.selectedUnitToMove!.setHasMoved(true)
    this.selectedUnitToMove = null

    // Check for game over condition after each unit action
    const gameOverCondition = this.game.getGameOverCondition()
    if (gameOverCondition !== GameOverConditions.IN_PROGRESS) {
      this.game.handleGameOverCondition(gameOverCondition)
    } else {
      if (this.hasLastUnitMoved()) {
        this.switchTurn()
      }
    }
  }

  handleMoveUnitToCursor() {
    if (this.canMovePlayerToCursorPosition()) {
      this.movePlayerToCursorPosition()
      this.attackableEnemyUnits = this.getAttackableEnemies()
      if (this.attackableEnemyUnits.length > 0) {
        this.selectedUnitToMove!.highlightOnlyAttackableSquares()
        this.moveCursorToAttackableTarget()
        this.cursor.setCursorTint(0xffcccb)
        this.actionState = ActionState.SELECT_ATTACK_TARGET
      } else {
        this.completeUnitAction()
      }
    }
  }

  handleSelectUnitToMove() {
    if (this.canHighlightPlayerForMovement()) {
      const playerAtCursor = this.getPlayerAtCursor()
      playerAtCursor!.highlight()
      this.selectedUnitToMove = playerAtCursor
      this.actionState = ActionState.SELECT_MOVE_DEST
    }
  }

  handleSpaceBarPress() {
    if (this.game.currTurn === Side.PLAYER) {
      switch (this.actionState) {
        case ActionState.SELECT_MOVE_DEST: {
          this.handleMoveUnitToCursor()
          break
        }
        case ActionState.SELECT_UNIT_TO_MOVE: {
          this.handleSelectUnitToMove()
          break
        }
        case ActionState.SELECT_ATTACK_TARGET: {
          this.handleAttackSelectedTarget()
          break
        }
      }
    }
  }

  getAttackableEnemies() {
    const enemyUnits = this.game.cpu.getLivingUnits()
    const selectedUnitAttackableSquareCoordinates = new Set<string>([])
    this.selectedUnitToMove!.saveAttackableSquaresPostMove()
    this.selectedUnitToMove!.attackableSquaresPostMove.forEach((attackableSquare) => {
      const cell = this.game.grid.getCellAtWorldPosition(attackableSquare.x, attackableSquare.y)
      selectedUnitAttackableSquareCoordinates.add(`${cell.gridRow},${cell.gridCol}`)
    })
    return enemyUnits.filter((unit: Unit) => {
      const { row, col } = unit.getRowCol()
      return selectedUnitAttackableSquareCoordinates.has(`${row},${col}`)
    })
  }

  moveCursorToAttackableTarget() {
    const firstAttackableUnit = this.getAttackableEnemies()[this.selectedAttackableUnitIndex]
    const { row, col } = firstAttackableUnit.getRowCol()
    this.moveCursorToRowCol(row, col)
  }

  hasEnemyInAttackRange() {
    const attackableEnemies = this.getAttackableEnemies()
    return attackableEnemies.length > 0
  }

  startTurn() {
    this.cursor.show()
    GameUI.instance.configureAttackAnimationModal(AttackDirection.LEFT)
  }

  hasLastUnitMoved() {
    const livingUnits = this.getLivingUnits()
    for (let i = 0; i < livingUnits.length; i++) {
      const unit = livingUnits[i]
      if (!unit.hasMoved) {
        return false
      }
    }
    return true
  }

  switchTurn() {
    this.cursor.hide()
    GameUI.instance.hideUnitStats()
    const livingUnits = this.getLivingUnits()
    livingUnits.forEach((unit) => {
      unit.setHasMoved(false)
    })
    this.game.setTurn(Side.CPU)
  }

  movePlayerToCursorPosition() {
    const gridRowCol = this.cursor.gridRowColPosition
    this.selectedUnitToMove!.moveToRowColPosition(gridRowCol.row, gridRowCol.col)
  }

  canHighlightPlayerForMovement() {
    const playerAtCursor = this.getPlayerAtCursor()
    return playerAtCursor != null && !playerAtCursor.hasMoved
  }

  canMovePlayerToCursorPosition(): boolean {
    const gridRowCol = this.cursor.gridRowColPosition
    return (
      this.selectedUnitToMove != null &&
      this.selectedUnitToMove.isSquareWithinMoveableSquares(gridRowCol.row, gridRowCol.col) &&
      !this.game.unitAtPosition(gridRowCol.row, gridRowCol.col, this.selectedUnitToMove)
    )
  }

  getPlayerAtCursor() {
    const livingUnits = this.getLivingUnits()
    const playerAtCursor = livingUnits.find((playerUnit: Unit) => {
      const { row, col } = playerUnit.getRowCol()
      const gridRowCol = this.cursor.gridRowColPosition
      return row === gridRowCol.row && col === gridRowCol.col
    })
    return playerAtCursor !== undefined ? playerAtCursor : null
  }

  initUnits(playerConfig: InitialUnitConfig[]) {
    console.log(playerConfig)
    playerConfig.forEach((unitConfig) => {
      const rowColPos = unitConfig.rowColPos
      const cell = this.game.grid.getCellAtRowCol(rowColPos[0], rowColPos[1])
      const playerUnit = new Unit(this.game, {
        position: {
          x: cell.centerX,
          y: cell.centerY,
        },
        name: unitConfig.name,
        texture: unitConfig.texture,
        moveRange: unitConfig.moveRange,
        attackRange: unitConfig.attackRange,
        maxHealth: unitConfig.maxHealth,
        unitType: unitConfig.unitType,
        baseDamageAmount: unitConfig.baseDamageAmount,
      })
      this.units.push(playerUnit)
    })
  }
}
