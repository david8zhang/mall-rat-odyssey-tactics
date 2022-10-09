import { CutsceneConfig } from '~/scenes/Cutscene'
import { GameConstants } from './GameConstants'

// Move these interfaces and enums to another file
export interface CutsceneCharacterConfig {
  row: number
  col: number
  texture?: string
  camFocus?: boolean
}

export enum SceneType {
  CUTSCENE = 'CUTSCENE',
  DIALOG = 'DIALOG',
  GAME = 'GAME',
}

export enum SpeakerPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface DialogLine {
  text: string
  screenShakeConfig?: {
    duration: number
    intensity: number
  }
  spriteConfig: {
    texture: string
    scale?: number
    position?: SpeakerPosition
  }
}

export interface DialogConfig {
  speakerTexture: string
  spriteConfig?: {
    scale: number
  }
  dialogLines: DialogLine[]
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
  ],
  playerConfig: [
    {
      rowColPos: [24, 12],
      texture: 'rat1',
      name: 'Rat 1',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
    },
    {
      rowColPos: [24, 11],
      texture: 'rat1',
      name: 'Rat 2',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
    },
    {
      rowColPos: [24, 13],
      texture: 'rat1',
      name: 'Rat 3',
      moveRange: GameConstants.DEFAULT_UNIT_MOVE_RANGE,
      attackRange: GameConstants.DEFAULT_UNIT_ATTACK_RANGE,
      maxHealth: GameConstants.DEFAULT_UNIT_MAX_HEALTH,
    },
  ],
}

export const SAMPLE_DIALOG: DialogConfig = {
  speakerTexture: 'rat-dialog',
  spriteConfig: {
    scale: 0.5,
  },
  dialogLines: [
    {
      screenShakeConfig: {
        duration: 250,
        intensity: 0.025,
      },
      text: 'I AM NOT CRAZY!',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'I am not crazy!',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'I know he swapped those numbers',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'I knew it was 1216. One after Magna Carta. As if I could ever make such a mistake. Never. Never!',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: "I just - I just couldn't prove it. He covered his tracks, he got that idiot at the copy shop to lie for him..",
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: "You think this is something? You think this is bad? This? This chicanery? He's done worse!",
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'That billboard! Are you telling me that a man just happens to fall like that? No! HE orchestrated it! Jimmy!',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      screenShakeConfig: {
        duration: 500,
        intensity: 0.01,
      },
      text: 'He DEFECATED through a SUNROOF!',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: "And I saved him! And I shouldn't have...",
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'I took him into my own firm! What was I thinking!?',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: "He'll never change. He'll NEVER change! Ever since he was 9, Always the same!",
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: "Couldn't keep his hands out of the cash drawer!",
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'But not our Jimmy!',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: "Couldn't be precious Jimmy!",
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'Stealing them blind!',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'And HE gets to be a lawyer?',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      screenShakeConfig: {
        duration: 500,
        intensity: 0.01,
      },
      text: 'What a sick joke!',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: "I should've stopped him when I had the chance!",
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'And you, you have to stop him! You...',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: '...',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'I apologize.',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'I lost my train of thought',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'Got carried away..',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
    {
      text: 'Do you have anything else?',
      spriteConfig: {
        texture: 'rat-dialog',
      },
    },
  ],
}

export const SAMPLE_CUTSCENE: CutsceneConfig = {
  initialState: {
    characterConfigs: {
      rat1: {
        row: 0,
        col: 0,
        texture: 'rat1',
        camFocus: true,
      },
      rat2: {
        row: 1,
        col: 0,
        texture: 'rat2',
      },
    },
  },
  newStates: [
    {
      characterConfigs: {
        rat1: {
          row: 0,
          col: 15,
        },
        rat2: {
          row: 1,
          col: 15,
        },
      },
    },
    {
      characterConfigs: {
        rat1: {
          row: 5,
          col: 5,
        },
      },
    },
    {
      characterConfigs: {
        rat1: {
          row: 5,
          col: 5,
        },
      },
      dialogLines: [
        {
          text: 'Super Idol的笑容',
          spriteConfig: {
            texture: 'muscular-rat',
            scale: 0.25,
            position: SpeakerPosition.LEFT,
          },
        },
        {
          text: '都没你的甜',
          spriteConfig: {
            texture: 'biggie-cheese',
            scale: 0.2,
            position: SpeakerPosition.RIGHT,
          },
        },
        {
          text: '八月正午的阳光',
          spriteConfig: {
            texture: 'muscular-rat',
            scale: 0.25,
            position: SpeakerPosition.LEFT,
          },
        },
        {
          text: '都没你耀眼',
          spriteConfig: {
            texture: 'biggie-cheese',
            scale: 0.2,
            position: SpeakerPosition.RIGHT,
          },
        },
        {
          text: '热爱105度的你',
          spriteConfig: {
            texture: 'muscular-rat',
            scale: 0.25,
            position: SpeakerPosition.LEFT,
          },
        },
        {
          text: '滴滴清纯的蒸馏水~',
          spriteConfig: {
            texture: 'biggie-cheese',
            scale: 0.2,
            position: SpeakerPosition.RIGHT,
          },
        },
      ],
    },
    {
      characterConfigs: {
        rat1: {
          row: 5,
          col: 10,
        },
      },
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
            col: 13,
            texture: 'rat1',
          },
          citizenRat2: {
            row: 15,
            col: 12,
            texture: 'rat2',
          },
          citizenRat3: {
            row: 15,
            col: 14,
            texture: 'rat3',
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
      newStates: [
        {
          characterConfigs: {
            guardRat1: {
              row: 13,
              col: 10,
            },
          },
          dialogLines: [
            {
              text: 'I now present her royal highness: Princess Dottie of Pippin Dots!',
              spriteConfig: {
                texture: 'rat1',
                scale: 2,
                position: SpeakerPosition.LEFT,
              },
            },
          ],
        },
        {
          characterConfigs: {
            dottie: {
              row: 13,
              col: 12,
            },
            dialogLines: [
              {
                text: 'Thank you, <guardRat1>.',
                spriteConfig: {
                  texture: 'dottie',
                  scale: 2,
                  position: SpeakerPosition.RIGHT,
                },
              },
              {
                text: 'It is my pleasure to welcome you all, my loyal subjects to the fifth annual Ice Cream Banquet!',
                spriteConfig: {
                  texture: 'dottie',
                  scale: 2,
                  position: SpeakerPosition.RIGHT,
                },
              },
            ],
          },
        },
      ],
    },
  },
]

export const FULL_GAME_LEVEL_CONFIG = [PIPPIN_DOTS_LEVEL]
export const SAMPLE_LEVEL = [
  {
    sceneType: SceneType.CUTSCENE,
    config: SAMPLE_CUTSCENE,
  },
  {
    sceneType: SceneType.DIALOG,
    config: SAMPLE_DIALOG,
  },
  {
    sceneType: SceneType.GAME,
    config: SAMPLE_GAME,
  },
]
export const SAMPLE_GAME_LEVEL_CONFIG = [SAMPLE_LEVEL]
