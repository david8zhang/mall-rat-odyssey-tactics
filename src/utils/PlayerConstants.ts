export class PlayerConstants {
  public static readonly DEFAULT_UNIT_MOVE_RANGE = 5
  public static readonly DEFAULT_UNIT_ATTACK_RANGE = 1
  public static readonly DEFAULT_UNIT_MAX_HEALTH = 50
  public static readonly UNIT_CONFIGS = [
    {
      rowColPos: [24, 12],
      texture: 'rat1',
      name: 'Rat 1',
      moveRange: PlayerConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: PlayerConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: PlayerConstants.DEFAULT_UNIT_MAX_HEALTH,
    },
    {
      rowColPos: [24, 11],
      texture: 'rat1',
      name: 'Rat 2',
      moveRange: PlayerConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: PlayerConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: PlayerConstants.DEFAULT_UNIT_MAX_HEALTH,
    },
    {
      rowColPos: [24, 13],
      texture: 'rat1',
      name: 'Rat 3',
      moveRange: PlayerConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: PlayerConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: PlayerConstants.DEFAULT_UNIT_MAX_HEALTH,
    },
  ]
}
