import { CutsceneStateTypes } from '~/scenes/cutscene/CutsceneConstants'
import { AnimationTypes } from '~/scenes/cutscene/states/AnimateSpriteState'
import { SpeakerPosition } from '~/scenes/dialog/DialogConstants'
import { SceneType } from '../SceneTypes'

const OPENING_CUTSCENE = {
  sceneType: SceneType.CUTSCENE,
  config: {
    initialState: {
      camPosition: {
        row: 4,
        col: 12,
      },
      characterConfigs: {
        dropp: {
          row: 3,
          col: 8,
          texture: 'rat2',
        },
        copp: {
          row: 3,
          col: 0,
          texture: 'rat2',
        },
        scSoldier1: {
          row: 10,
          col: 0,
          texture: 'rat2',
        },
      },
    },
    states: [
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            colDiff: 8,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            colDiff: -8,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            colDiff: 8,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            colDiff: -4,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          dropp: {
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
            sortOrder: 0,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Arrggh...I can't wait any longer!",
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          copp: {
            colDiff: 4,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'YOOOO!!!',
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
            screenShakeConfig: {
              duration: 500,
              intensity: 0.005,
            },
          },
          {
            text: 'I GOT EM!!!',
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          dropp: {
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            colDiff: -7,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Let me see em!!!',
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          dropp: {
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
          },
          copp: {
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
            delay: 10,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Man!!! These are straight HEAT bro!',
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'I told you I got the hook up!',
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "What'd he ask for these? Just curious...",
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'Pshh like nothing bro...',
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Just to keep an eye out on some fools that might be rolling up here soon',
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'He wants us to rough em up and stop em from getting to him',
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            colDiff: 4,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            rowDiff: 4,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            colDiff: -4,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            rowDiff: -4,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Haha, good luck trying to catch us in these!',
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'And we got em for the whole crew?',
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          copp: {
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Yessir! The whole gang's been zipping around in these.",
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "We'll run circles around anybody who messes with us",
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          scSoldier1: {
            colDiff: 5,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Copp! Dropp! Those suckers you were telling us to watch for.. They're here!",
            spriteConfig: {
              charKey: 'scSoldier1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Aight.. Let's see what these babies can do!",
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
    ],
  },
}

export const SHOE_CASTLE_LEVEL = {
  prereqs: ['Pop Topic'],
  levelName: 'Shoe Castle',
  scenes: [OPENING_CUTSCENE],
}
