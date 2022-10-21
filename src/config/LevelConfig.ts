import {
  DEFAULT_CPU_UNIT_ATTACK_RANGE,
  DEFAULT_CPU_UNIT_DAMAGE,
  DEFAULT_CPU_UNIT_MAX_HEALTH,
  DEFAULT_CPU_UNIT_MOVE_RANGE,
  DEFAULT_UNIT_ATTACK_RANGE,
  DEFAULT_UNIT_DAMAGE,
  DEFAULT_UNIT_MAX_HEALTH,
  DEFAULT_UNIT_MOVE_RANGE,
  UnitTypes,
} from '../core/units/UnitConstants'
import { PIPPIN_DOTS_LEVEL } from './levels/PippinDots'
import { POP_TOPIC_LEVEL } from './levels/PopTopic'
import { SHOE_CASTLE_LEVEL } from './levels/ShoeCastle'
import { SceneType } from './SceneTypes'

export interface SceneConfig {
  sceneType: SceneType
  config: any
}

export interface LevelConfig {
  prereqs: string[]
  levelName: string
  scenes: SceneConfig[]
}

export interface GameConfig {
  preGameLevels: LevelConfig[]
  gameLevels: LevelConfig[]
}

export const SAMPLE_GAME = {
  cpuConfig: [
    {
      rowColPos: [11, 11],
      texture: 'rat2',
      name: 'CPU Rat 1',
      moveRange: DEFAULT_CPU_UNIT_MOVE_RANGE,
      attackRange: DEFAULT_CPU_UNIT_ATTACK_RANGE,
      maxHealth: DEFAULT_CPU_UNIT_MAX_HEALTH,
      baseDamageAmount: DEFAULT_CPU_UNIT_DAMAGE,
      unitType: UnitTypes.RANGED,
    },
    {
      rowColPos: [11, 12],
      texture: 'rat2',
      name: 'CPU Rat 2',
      moveRange: DEFAULT_CPU_UNIT_MOVE_RANGE,
      attackRange: DEFAULT_CPU_UNIT_ATTACK_RANGE,
      maxHealth: DEFAULT_CPU_UNIT_MAX_HEALTH,
      baseDamageAmount: DEFAULT_CPU_UNIT_DAMAGE,
      unitType: UnitTypes.RANGED,
    },
    {
      rowColPos: [11, 13],
      texture: 'rat2',
      name: 'CPU Rat 3',
      moveRange: DEFAULT_CPU_UNIT_MOVE_RANGE,
      attackRange: DEFAULT_CPU_UNIT_ATTACK_RANGE,
      maxHealth: DEFAULT_CPU_UNIT_MAX_HEALTH,
      baseDamageAmount: DEFAULT_CPU_UNIT_DAMAGE,
      unitType: UnitTypes.RANGED,
    },
  ],
  playerConfig: [
    {
      rowColPos: [24, 12],
      texture: 'rat1',
      name: 'Rat 1',
      moveRange: DEFAULT_UNIT_MOVE_RANGE,
      attackRange: DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: DEFAULT_UNIT_MAX_HEALTH,
      baseDamageAmount: DEFAULT_UNIT_DAMAGE,
      unitType: UnitTypes.PHYSICAL,
    },
    {
      rowColPos: [24, 11],
      texture: 'rat1',
      name: 'Rat 2',
      moveRange: DEFAULT_UNIT_MOVE_RANGE,
      attackRange: DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: DEFAULT_UNIT_MAX_HEALTH,
      baseDamageAmount: DEFAULT_UNIT_DAMAGE,
      unitType: UnitTypes.PHYSICAL,
    },
    {
      rowColPos: [24, 13],
      texture: 'rat1',
      name: 'Rat 3',
      moveRange: DEFAULT_UNIT_MOVE_RANGE,
      attackRange: DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: DEFAULT_UNIT_MAX_HEALTH,
      baseDamageAmount: DEFAULT_UNIT_DAMAGE,
      unitType: UnitTypes.PHYSICAL,
    },
  ],
}

export const GAME_LEVELS = [POP_TOPIC_LEVEL, SHOE_CASTLE_LEVEL]
export const ALL_GAME_CONFIG = {
  preGameLevels: [],
  gameLevels: GAME_LEVELS,
}
