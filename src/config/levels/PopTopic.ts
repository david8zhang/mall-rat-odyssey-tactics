import { CutsceneStateTypes } from '~/scenes/cutscene/CutsceneConstants'
import { AnimationTypes } from '~/scenes/cutscene/states/AnimateSpriteState'
import { SpeakerPosition } from '~/scenes/dialog/DialogConstants'
import { SceneType } from '../SceneTypes'

const OPENING_CUTSCENE = {
  sceneType: SceneType.CUTSCENE,
  config: {
    initialState: {
      characterConfigs: {
        mai: {
          row: 5,
          col: 10,
          texture: 'pop-topic-rat',
        },
        kimiko: {
          row: 5,
          col: 12,
          texture: 'pop-topic-rat',
        },
        roman: {
          row: 5,
          col: 14,
          texture: 'pop-topic-rat',
        },
      },
    },
    states: [
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Dude...I'm just gonna come out and say it. I DON'T like My He-Roach Academia",
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Ummm...',
            spriteConfig: {
              charKey: 'kimiko',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          kimiko: {
            colDiff: 1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Kinda cringe!',
            spriteConfig: {
              charKey: 'kimiko',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          mai: {
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'You know what, Kimiko? No!',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "Nobody says 'cringe' anymore, okay? Saying 'cringe' is cringe!",
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Besides, who even wants to watch a show about a bunch of cockroaches with super powers anyways...',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
    ],
  },
}

export const POP_TOPIC_LEVEL = {
  prereqs: ['Pippin Dots'],
  levelName: 'Pop Topic',
  scenes: [OPENING_CUTSCENE],
}
