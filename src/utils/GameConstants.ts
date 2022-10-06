export class GameConstants {
  public static readonly WINDOW_HEIGHT = 256
  public static readonly WINDOW_WIDTH = 320
  public static readonly GAME_HEIGHT = 400
  public static readonly GAME_WIDTH = 400
  public static readonly TILE_SIZE = 16
  public static readonly CAMERA_SCORLL_SPEED = 2
  public static readonly GAME_ZOOM_FACTOR = 2

  public static readonly DEFAULT_UNIT_MOVE_RANGE = 5
  public static readonly DEFAULT_UNIT_ATTACK_RANGE = 1
  public static readonly DEFAULT_UNIT_MAX_HEALTH = 50

  public static readonly CPU_START_CONFIG = [
    {
      rowColPos: [11, 11],
      texture: 'rat2',
      name: 'CPU Rat 1',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
    },
    {
      rowColPos: [11, 12],
      texture: 'rat2',
      name: 'CPU Rat 2',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
    },
    {
      rowColPos: [11, 13],
      texture: 'rat2',
      name: 'CPU Rat 3',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
    },
  ]
}
