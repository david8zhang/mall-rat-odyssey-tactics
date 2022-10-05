import { CutsceneConfig } from '~/scenes/Cutscene'
import { SpeakerPosition } from '~/scenes/Dialog'

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
