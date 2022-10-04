import { CutsceneConfig } from '~/scenes/Cutscene'

export const SAMPLE_CUTSCENE: CutsceneConfig = {
  initialState: {
    characterConfigs: {
      rat1: {
        row: 0,
        col: 0,
        texture: 'rat1',
        camFocus: true,
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
          text: 'Super Idol de xiao rong',
          spriteConfig: {
            texture: 'rat1',
          },
        },
        {
          text: 'Dou mei ni de tian',
          spriteConfig: {
            texture: 'rat1',
          },
        },
        {
          text: 'Ba yue zheng wu de yang guang',
          spriteConfig: {
            texture: 'rat1',
          },
        },
        {
          text: 'Dou mei ni yao yan',
          spriteConfig: {
            texture: 'rat1',
          },
        },
        {
          text: 'Re ai yi bai ling wu du de ni',
          spriteConfig: {
            texture: 'rat1',
          },
        },
        {
          text: 'Di di qing chun de zheng liu shui~',
          spriteConfig: {
            texture: 'rat1',
          },
        },
      ],
    },
  ],
}
