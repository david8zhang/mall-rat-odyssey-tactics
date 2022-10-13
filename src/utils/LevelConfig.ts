import { CutsceneStateTypes } from './CutsceneConstants'
import { SpeakerPosition } from './DialogConstants'
import { GameConstants } from './GameConstants'
import { UnitTypes } from './UnitConstants'

// Move these interfaces and enums to another file

export enum SceneType {
  CUTSCENE = 'CUTSCENE',
  DIALOG = 'DIALOG',
  GAME = 'GAME',
}

export const SAMPLE_GAME = {
  cpuConfig: [
    {
      rowColPos: [11, 11],
      texture: 'rat2',
      name: 'CPU Rat 1',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
      unitType: UnitTypes.PHYSICAL,
    },
    {
      rowColPos: [11, 12],
      texture: 'rat2',
      name: 'CPU Rat 2',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
      unitType: UnitTypes.PHYSICAL,
    },
    {
      rowColPos: [11, 13],
      texture: 'rat2',
      name: 'CPU Rat 3',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
      unitType: UnitTypes.PHYSICAL,
    },
  ],
  playerConfig: [
    {
      rowColPos: [24, 12],
      texture: 'rat1',
      name: 'Rat 1',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
      unitType: UnitTypes.RANGED,
    },
    {
      rowColPos: [24, 11],
      texture: 'rat1',
      name: 'Rat 2',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
      unitType: UnitTypes.RANGED,
    },
    {
      rowColPos: [24, 13],
      texture: 'rat1',
      name: 'Rat 3',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
      unitType: UnitTypes.RANGED,
    },
  ],
}

export const PIPPIN_DOTS_LEVEL = [
  {
    sceneType: SceneType.CUTSCENE,
    config: {
      initialState: {
        characterConfigs: {
          dottie: {
            row: 12,
            col: 12,
            texture: 'dottie',
            camFocus: true,
          },
          citizenRat1: {
            row: 15,
            col: 11,
            texture: 'rat1',
          },
          citizenRat2: {
            row: 15,
            col: 12,
            texture: 'rat1',
          },
          citizenRat3: {
            row: 15,
            col: 13,
            texture: 'rat1',
          },
          guardRat1: {
            row: 12,
            col: 10,
            texture: 'rat1',
          },
          guardRat2: {
            row: 12,
            col: 14,
            texture: 'rat1',
          },
        },
      },
      states: [
        {
          type: CutsceneStateTypes.CHARACTER_MOVEMENT,
          config: {
            guardRat1: {
              row: 13,
              col: 10,
            },
          },
        },
        {
          type: CutsceneStateTypes.DIALOG,
          config: [
            {
              text: 'I now present, her royal highness Princess Dottie of the great kingdom of Pippin Dots!',
              spriteConfig: {
                texture: 'rat1',
                scale: 3,
                position: SpeakerPosition.LEFT,
              },
            },
          ],
        },
      ],
    },
  },
]

export const FULL_GAME_LEVEL_CONFIG = [PIPPIN_DOTS_LEVEL]
