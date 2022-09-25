import Game from '~/scenes/Game'
import { UI } from '~/scenes/UI'
import { Direction } from '~/utils/Directions'
import { PlayerConstants } from '~/utils/PlayerConstants'
import { Side } from '~/utils/Side'
import { Cursor, CursorState } from './Cursor'
import { Unit } from './Unit'

export class Player {
  private game: Game
  private cursor: Cursor
  public units: Unit[] = []
  public selectedUnitToMove: Unit | null = null

  // Attacking
  public attackableEnemyUnits: Unit[] = []
  public selectedAttackableUnitIndex: number = 0

  constructor(game: Game) {
    this.game = game
    this.initUnits()
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
      }
    })
  }

  handleMouseClick(pointer: Phaser.Input.Pointer) {
    switch (this.cursor.cursorState) {
      case CursorState.SCROLL:
      case CursorState.MOVE: {
        const cell = this.game.grid.getCellAtWorldPosition(pointer.worldX, pointer.worldY)
        this.cursor.moveToRowCol(cell.gridRow, cell.gridCol)
        break
      }
    }
  }

  handleArrowKeyPress(arrowKeyCode: string) {
    switch (this.cursor.cursorState) {
      case CursorState.SCROLL:
      case CursorState.MOVE:
        this.moveCursor(arrowKeyCode)
        break
      case CursorState.ATTACK: {
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

  moveCursor(arrowKeyCode: string) {
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
  }

  handleAttackSelectedTarget() {
    const selectedUnitToAttack = this.attackableEnemyUnits[this.selectedAttackableUnitIndex]
    UI.instance.playAttackAnimation(this.selectedUnitToMove!, selectedUnitToAttack, () => {
      this.cursor.cursorState = CursorState.SCROLL
      this.cursor.clearCursorTint()
      this.selectedUnitToMove!.setHasMoved(true)
      this.selectedUnitToMove = null
      if (this.hasLastUnitMoved()) {
        this.switchTurn()
      }
    })
  }

  handleMoveUnitToCursor() {
    if (this.canMovePlayerToCursorPosition()) {
      this.movePlayerToCursorPosition()
      this.attackableEnemyUnits = this.getAttackableEnemies()
      if (this.attackableEnemyUnits.length > 0) {
        this.selectedUnitToMove!.highlightOnlyAttackableSquares()
        this.moveCursorToAttackableTarget()
        this.cursor.setCursorTint(0xffcccb)
        this.cursor.cursorState = CursorState.ATTACK
      } else {
        this.selectedUnitToMove!.dehighlight()
        this.selectedUnitToMove!.setHasMoved(true)
        this.selectedUnitToMove = null
        if (this.hasLastUnitMoved()) {
          this.switchTurn()
        }
      }
    }
  }

  handleSelectUnitToMove() {
    if (this.canHighlightPlayerForMovement()) {
      const playerAtCursor = this.getPlayerAtCursor()
      playerAtCursor!.highlight()
      this.selectedUnitToMove = playerAtCursor
      this.cursor.cursorState = CursorState.MOVE
    }
  }

  handleSpaceBarPress() {
    if (this.game.currTurn === Side.PLAYER) {
      switch (this.cursor.cursorState) {
        case CursorState.MOVE: {
          this.handleMoveUnitToCursor()
          break
        }
        case CursorState.SCROLL: {
          this.handleSelectUnitToMove()
          break
        }
        case CursorState.ATTACK: {
          this.handleAttackSelectedTarget()
          break
        }
      }
    }
  }

  getAttackableEnemies() {
    const enemyUnits = this.game.cpu.units
    const selectedUnitAttackableSquareCoordinates = new Set<string>([])
    this.selectedUnitToMove!.attackableSquares.forEach((attackableSquare) => {
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
    this.cursor.moveToRowCol(row, col)
  }

  hasEnemyInAttackRange() {
    const attackableEnemies = this.getAttackableEnemies()
    return attackableEnemies.length > 0
  }

  startTurn() {
    this.units.forEach((unit) => {
      unit.setHasMoved(false)
    })
  }

  hasLastUnitMoved() {
    for (let i = 0; i < this.units.length; i++) {
      const unit = this.units[i]
      if (!unit.hasMoved) {
        return false
      }
    }
    return true
  }

  switchTurn() {
    this.game.setTurn(Side.CPU)
  }

  unitAtPosition(row: number, col: number, selectedUnit: Unit) {
    for (let i = 0; i < this.units.length; i++) {
      const unit = this.units[i]
      const rowCol = unit.getRowCol()
      if (rowCol.row === row && rowCol.col === col && unit !== selectedUnit) {
        return true
      }
    }
    return false
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
      !this.unitAtPosition(gridRowCol.row, gridRowCol.col, this.selectedUnitToMove)
    )
  }

  getPlayerAtCursor() {
    const playerAtCursor = this.units.find((playerUnit: Unit) => {
      const { row, col } = playerUnit.getRowCol()
      const gridRowCol = this.cursor.gridRowColPosition
      return row === gridRowCol.row && col === gridRowCol.col
    })
    return playerAtCursor !== undefined ? playerAtCursor : null
  }

  initUnits() {
    const playerConfigs = PlayerConstants.START_CONFIG
    playerConfigs.forEach((playerConfig) => {
      const rowColPos = playerConfig.rowColPos
      const cell = this.game.grid.getCellAtRowCol(rowColPos[0], rowColPos[1])
      const playerUnit = new Unit(this.game, {
        position: {
          x: cell.centerX,
          y: cell.centerY,
        },
        texture: playerConfig.texture,
        moveRange: 4,
        attackRange: 200,
      })
      this.units.push(playerUnit)
    })
    const playerUnitToFocusOn = this.units[0]
    this.game.cameras.main.centerOn(playerUnitToFocusOn.x, playerUnitToFocusOn.y)
  }
}
