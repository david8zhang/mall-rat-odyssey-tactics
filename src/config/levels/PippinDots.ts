import { UnitTypes } from '~/core/units/UnitConstants'
import { CutsceneStateTypes } from '~/scenes/cutscene/CutsceneConstants'
import { AnimationTypes } from '~/scenes/cutscene/states/AnimateSpriteState'
import { ScreenEffects } from '~/scenes/cutscene/states/ScreenEffectState'
import { SpeakerPosition } from '~/scenes/dialog/DialogConstants'
import { SceneType } from '../SceneTypes'

const OPENING_CUTSCENE = {
  sceneType: SceneType.CUTSCENE,
  config: {
    initialState: {
      characterConfigs: {
        dottie: {
          row: 12,
          col: 12,
          texture: 'dottie',
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
        guardRat3: {
          row: 5,
          col: 24,
          texture: 'rat1',
        },
        invaderRat1: {
          row: 5,
          col: 24,
          texture: 'rat2',
        },
        invaderRat2: {
          row: 6,
          col: 24,
          texture: 'rat2',
        },
        invaderRat3: {
          row: 7,
          col: 24,
          texture: 'rat2',
        },
        invaderRat4: {
          row: 5,
          col: 0,
          texture: 'rat2',
        },
        invaderRat5: {
          row: 6,
          col: 0,
          texture: 'rat2',
        },
        invaderRat6: {
          row: 7,
          col: 0,
          texture: 'rat2',
        },
      },
    },
    states: [
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          guardRat1: {
            rowDiff: 1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'I now present, her royal highness Princess Dottie of the great kingdom of Pippin Dots!',
            spriteConfig: {
              charKey: 'guardRat1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          citizenRat1: {
            sortOrder: 0,
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
          },
          citizenRat2: {
            sortOrder: 1,
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
            delay: 50,
          },
          citizenRat3: {
            sortOrder: 2,
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
            delay: 100,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          guardRat1: {
            rowDiff: -1,
          },
          dottie: {
            rowDiff: 1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Welcome rats of Pippin Dots to the annual Icy Dots Bonanza!',
            spriteConfig: {
              charKey: 'dottie',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'Unfortunately, my brother, Royal Prince Pippin could not be here with us this year during the great Channeling of the machine',
            spriteConfig: {
              charKey: 'dottie',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'However, I have received news that he and his expedition have slain the great Winged Menace, which will terrorize us no longer!',
            spriteConfig: {
              charKey: 'dottie',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          citizenRat1: {
            sortOrder: 0,
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
          },
          citizenRat2: {
            sortOrder: 1,
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
            delay: 50,
          },
          citizenRat3: {
            sortOrder: 2,
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
            delay: 100,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Indeed! We shall celebrate his victory with a bountiful feast of Icy Dots!',
            spriteConfig: {
              charKey: 'dottie',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dottie: {
            rowDiff: -3,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Now as you all know, I require complete silence as I channel the great Machine...',
            spriteConfig: {
              charKey: 'dottie',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          dottie: {
            sortOrder: 0,
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: '*Beep* Boop Boooop~',
          },
        ],
      },
      {
        type: CutsceneStateTypes.SCREEN_EFFECT,
        config: {
          effectType: ScreenEffects.FLASH_COLOR,
          config: {
            color: 0x0000ff,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Let the Icy Dots feats begin!',
            spriteConfig: {
              charKey: 'dottie',
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
            text: '~CRASH!!!',
            screenShakeConfig: {
              duration: 500,
              intensity: 0.005,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'What was that?',
            spriteConfig: {
              charKey: 'dottie',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          guardRat3: {
            colDiff: -5,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'My queen! Invaders!',
            spriteConfig: {
              charKey: 'guardRat3',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: "It's not safe for you here! Run-",
            spriteConfig: {
              charKey: 'guardRat3',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          invaderRat1: {
            colDiff: -4,
          },
          invaderRat2: {
            colDiff: -5,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          guardRat3: {
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Gaaah!~',
            spriteConfig: {
              charKey: 'guardRat3',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          guardRat3: {
            animType: AnimationTypes.FADE_OUT,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          citizenRat1: {
            colDiff: -100,
          },
          citizenRat2: {
            rowDiff: 100,
          },
          citizenRat3: {
            colDiff: 100,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Noooo!',
            spriteConfig: {
              charKey: 'dottie',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          guardRat1: {
            colDiff: 1,
            rowDiff: -2,
          },
          guardRat2: {
            colDiff: -1,
            rowDiff: -2,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'My queen! Get behind me!',
            spriteConfig: {
              charKey: 'guardRat2',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          invaderRat3: {
            colDiff: -3,
          },
          invaderRat4: {
            rowDiff: 0,
            colDiff: 3,
          },
          invaderRat5: {
            rowDiff: 1,
            colDiff: 3,
          },
          invaderRat6: {
            rowDiff: 2,
            colDiff: 3,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'There she is!',
            spriteConfig: {
              charKey: 'invaderRat1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'Grab her! Take out any who stand in our way!',
            spriteConfig: {
              charKey: 'invaderRat1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'Here they come! Prepare for battle!',
            spriteConfig: {
              charKey: 'guardRat1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
    ],
  },
}

const GAME_CONFIG = {
  sceneType: SceneType.GAME,
  config: {
    shouldProceedOnDefeat: true,
    preGameDialog: [
      {
        text: "There's too many of them! And they've blocked off all the exits!",
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.LEFT,
        },
      },
      {
        text: 'This is it then. Fight until your last breath!',
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.RIGHT,
        },
      },
    ],
    camPosition: {
      row: 7,
      col: 12,
    },
    playerConfig: [
      {
        rowColPos: [11, 11],
        texture: 'rat1',
        name: 'Guard 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [11, 12],
        texture: 'dottie',
        name: 'Pr. Dottie',
        moveRange: 3,
        attackRange: 1,
        maxHealth: 25,
        baseDamageAmount: 5,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [11, 13],
        texture: 'rat1',
        name: 'Guard 2',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
    ],
    cpuConfig: [
      {
        rowColPos: [2, 4],
        texture: 'rat2',
        name: 'Invader 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [3, 5],
        texture: 'rat2',
        name: 'Invader 2',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [3, 3],
        texture: 'rat2',
        name: 'Invader 3',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [3, 11],
        texture: 'rat2',
        name: 'Invader 4',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [3, 12],
        texture: 'rat2',
        name: 'Invader 5',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [3, 13],
        texture: 'rat2',
        name: 'Invader 6',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [3, 19],
        texture: 'rat2',
        name: 'Invader 7',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [2, 20],
        texture: 'rat2',
        name: 'Invader 8',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [3, 21],
        texture: 'rat2',
        name: 'Invader 9',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
    ],
    tileMapKey: 'cutscene-map',
  },
}

const POST_GAME_CUTSCENE = {
  sceneType: SceneType.CUTSCENE,
  config: {
    initialState: {
      characterConfigs: {
        dottie: {
          row: 12,
          col: 12,
          texture: 'dottie',
        },
        invader1: {
          row: 10,
          col: 12,
          texture: 'rat2',
        },
        invader2: {
          row: 12,
          col: 11,
          texture: 'rat2',
        },
        invader3: {
          row: 12,
          col: 13,
          texture: 'rat2',
        },
        pippin: {
          row: 12,
          col: 0,
          texture: 'rat1',
        },
        soldier2: {
          row: 14,
          col: 0,
          texture: 'rat1',
        },
        soldier3: {
          row: 11,
          col: 0,
          texture: 'rat1',
        },
        soldier4: {
          row: 13,
          col: 0,
          texture: 'rat1',
        },
        soldier5: {
          row: 15,
          col: 0,
          texture: 'rat1',
        },
        citizen1: {
          row: 13,
          col: 0,
          texture: 'rat1',
        },
      },
    },
    states: [
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          dottie: {
            sortOrder: 0,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Unhand me you filthy pests!',
            spriteConfig: {
              charKey: 'dottie',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          invader1: {
            rowDiff: 1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "You're only making this harder for yourself, princess.",
            spriteConfig: {
              charKey: 'invader1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'Cooperate with us and you may yet see your pitiful little friends again',
            spriteConfig: {
              charKey: 'invader1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'Resist, and you will suffer!',
            spriteConfig: {
              charKey: 'invader1',
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
            text: "My brother will come for me! And then you'll pay for your treachery!",
            spriteConfig: {
              charKey: 'dottie',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Let him come! We'll leave him like the rest of your friends here!",
            spriteConfig: {
              charKey: 'invader1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          invader1: {
            rowDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Rats! Move out! We must make haste! We don't want to keep HIM waiting...",
            spriteConfig: {
              charKey: 'invader1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          invader1: {
            colDiff: 100,
          },
          invader2: {
            colDiff: 100,
          },
          invader3: {
            colDiff: 100,
          },
          dottie: {
            colDiff: 100,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Over here your highness! Come quickly!',
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          citizen1: {
            colDiff: 12,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          pippin: {
            colDiff: 11,
          },
          soldier2: {
            colDiff: 11,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "No...we're too late!",
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          pippin: {
            rowDiff: -2,
            colDiff: 1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Martin...Lawrence... you fought with honor my brothers..',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          soldier2: {
            colDiff: 3,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          soldier2: {
            colDiff: -5,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Your highness! The princess is not among the dead here.',
            spriteConfig: {
              charKey: 'soldier2',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'The invaders must have taken her.',
            spriteConfig: {
              charKey: 'soldier2',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          pippin: {
            rowDiff: 2,
            colDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Then we shall chase that scum across',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'all of West Field...',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'We will not rest until the Princess is returned!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          pippin: {
            rowDiff: -2,
            colDiff: -3,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Soldiers of Pippin Dots! To me!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'We march to the land of Pop Topic!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          pippin: {
            colDiff: 100,
          },
          soldier2: {
            colDiff: 100,
          },
          citizen1: {
            rowDiff: 5,
          },
          soldier3: {
            colDiff: 100,
          },
          soldier4: {
            colDiff: 100,
          },
          soldier5: {
            colDiff: 100,
          },
        },
      },
    ],
  },
}

export const PIPPIN_DOTS_LEVEL = {
  prereqs: [],
  levelName: 'Pippin Dots',
  scenes: [OPENING_CUTSCENE, GAME_CONFIG, POST_GAME_CUTSCENE],
}
