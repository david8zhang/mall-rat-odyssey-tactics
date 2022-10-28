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
      camPosition: {
        row: 4,
        col: 12,
      },
      characterConfigs: {
        dropp: {
          row: 3,
          col: 8,
          texture: 'dropp',
        },
        copp: {
          row: 3,
          col: 0,
          texture: 'copp',
        },
        scSoldier1: {
          row: 10,
          col: 0,
          texture: 'shoe-castle-soldier',
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
            speed: 25,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            rowDiff: 4,
            speed: 25,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            colDiff: -4,
            speed: 25,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            rowDiff: -4,
            speed: 25,
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
            text: 'And we got kicks for the whole crew?',
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
            text: "Yessir! The whole gang's dripped out!",
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "We'll run circles around anybody who messes with us!",
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
      {
        type: CutsceneStateTypes.TRANSITION,
        config: {
          newState: {
            characterConfigs: {
              pippin: {
                row: 12,
                col: 12,
                texture: 'pippin',
              },
              soldier1: {
                row: 14,
                col: 10,
                texture: 'rat1',
              },
              soldier2: {
                row: 14,
                col: 11,
                texture: 'rat1',
              },
              soldier3: {
                row: 14,
                col: 13,
                texture: 'rat1',
              },
              soldier4: {
                row: 14,
                col: 14,
                texture: 'rat1',
              },
              scSoldier1: {
                row: 0,
                col: 16,
                texture: 'shoe-castle-soldier',
              },
              scSoldier2: {
                row: 16,
                col: 0,
                texture: 'shoe-castle-soldier',
              },
              scSoldier3: {
                row: 24,
                col: 8,
                texture: 'shoe-castle-soldier',
              },
              scSoldier4: {
                row: 0,
                col: 12,
                texture: 'shoe-castle-soldier',
              },
              scSoldier5: {
                row: 0,
                col: 11,
                texture: 'shoe-castle-soldier',
              },
              scSoldier6: {
                row: 0,
                col: 13,
                texture: 'shoe-castle-soldier',
              },
              scSoldier7: {
                row: 0,
                col: 8,
                texture: 'shoe-castle-soldier',
              },
              scSoldier8: {
                row: 0,
                col: 7,
                texture: 'shoe-castle-soldier',
              },
              scSoldier9: {
                row: 0,
                col: 16,
                texture: 'shoe-castle-soldier',
              },
              scSoldier10: {
                row: 0,
                col: 17,
                texture: 'shoe-castle-soldier',
              },
              rowan: {
                row: 16,
                col: 0,
                texture: 'pt-boss',
              },
            },
            camPosition: {
              row: 12,
              col: 12,
            },
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Prepare yourselves for battle!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "We have to assume that they're working with the enemy!",
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
          scSoldier1: {
            rowDiff: 100,
            speed: 25,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'What was that?!',
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          scSoldier2: {
            colDiff: 100,
            speed: 25,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Over there! Another one!',
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          scSoldier3: {
            rowDiff: -100,
            speed: 25,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "They're here! But they're moving so fast...",
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: "I can't see them at all!",
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          scSoldier4: {
            rowDiff: 6,
          },
          scSoldier5: {
            rowDiff: 6,
          },
          scSoldier6: {
            rowDiff: 6,
          },
          scSoldier7: {
            rowDiff: 5,
          },
          scSoldier8: {
            rowDiff: 5,
          },
          scSoldier9: {
            rowDiff: 5,
          },
          scSoldier10: {
            rowDiff: 5,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Y'all see what we got up in here!",
            spriteConfig: {
              charKey: 'scSoldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "You better all back off! We'll mess you up!",
            spriteConfig: {
              charKey: 'scSoldier1',
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
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Listen! All I want is to find my sister!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: "If you give us some information, we'll leave you alone!",
            spriteConfig: {
              charKey: 'pippin',
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
            text: "Sorry, bro! Can't do that!",
            spriteConfig: {
              charKey: 'scSoldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "You'll just need to come up here and square up!",
            spriteConfig: {
              charKey: 'scSoldier1',
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
            rowDiff: 2,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Pippin! Wait just one second!',
            screenShakeConfig: {
              duration: 500,
              intensity: 0.005,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          rowan: {
            colDiff: 8,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Rowan! What are you doing here?',
            spriteConfig: {
              charKey: 'pippin',
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
            text: 'I want to help you find your sister!',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'And seeing as these guys have clearly made some kind of deal with Naldo',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'to be able to move so fast...',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "It looks like you'll need my help!",
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
    ],
  },
}

const FIRST_LEVEL = {
  sceneType: SceneType.GAME,
  config: {
    preGameDialog: [
      {
        text: "They've got some kind of speed-shoes..",
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.LEFT,
        },
      },
      {
        text: 'It allows them to move after attacking!',
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.LEFT,
        },
      },
    ],
    camPosition: {
      row: 12,
      col: 12,
    },
    playerConfig: [
      {
        rowColPos: [14, 11],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [14, 10],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [12, 12],
        texture: 'pippin',
        name: 'Pippin',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [14, 14],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [14, 13],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [16, 8],
        texture: 'pt-boss',
        name: 'Rowan',
        moveRange: 4,
        attackRange: 4,
        maxHealth: 100,
        baseDamageAmount: 20,
        unitType: UnitTypes.RANGED,
      },
    ],
    cpuConfig: [
      {
        rowColPos: [6, 11],
        texture: 'shoe-castle-soldier',
        name: 'Enemy 1',
        moveRange: 8,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 7.5,
        unitType: UnitTypes.PHYSICAL,
        maxExtraMoves: 1,
      },
      {
        rowColPos: [6, 12],
        texture: 'shoe-castle-soldier',
        name: 'Enemy 2',
        moveRange: 8,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 7.5,
        unitType: UnitTypes.PHYSICAL,
        maxExtraMoves: 1,
      },
      {
        rowColPos: [6, 13],
        texture: 'shoe-castle-soldier',
        name: 'Enemy 3',
        moveRange: 8,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 7.5,
        unitType: UnitTypes.PHYSICAL,
        maxExtraMoves: 1,
      },
      {
        rowColPos: [5, 8],
        texture: 'shoe-castle-soldier',
        name: 'Enemy 4',
        moveRange: 8,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 7.5,
        unitType: UnitTypes.PHYSICAL,
        maxExtraMoves: 1,
      },
      {
        rowColPos: [5, 7],
        texture: 'shoe-castle-soldier',
        name: 'Enemy 5',
        moveRange: 8,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 7.5,
        unitType: UnitTypes.PHYSICAL,
        maxExtraMoves: 1,
      },
      {
        rowColPos: [5, 16],
        texture: 'shoe-castle-soldier',
        name: 'Enemy 6',
        moveRange: 8,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 7.5,
        unitType: UnitTypes.PHYSICAL,
        maxExtraMoves: 1,
      },
      {
        rowColPos: [5, 17],
        texture: 'shoe-castle-soldier',
        name: 'Enemy 7',
        moveRange: 8,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 7.5,
        unitType: UnitTypes.PHYSICAL,
        maxExtraMoves: 1,
      },
    ],
    tileMapKey: 'cutscene-map',
  },
}

const FIRST_LEVEL_VICTORY_CUTSCENE = {
  sceneType: SceneType.CUTSCENE,
  config: {
    initialState: {
      camPosition: {
        row: 12,
        col: 12,
      },
      characterConfigs: {
        pippin: {
          row: 23,
          col: 12,
          texture: 'pippin',
        },
        rowan: {
          row: 23,
          col: 10,
          texture: 'pt-boss',
        },
        soldier1: {
          row: 24,
          col: 9,
          texture: 'rat1',
        },
        soldier2: {
          row: 24,
          col: 8,
          texture: 'rat1',
        },
        soldier3: {
          row: 24,
          col: 15,
          texture: 'rat1',
        },
        soldier4: {
          row: 24,
          col: 16,
          texture: 'rat1',
        },
        copp: {
          row: 6,
          col: 0,
          texture: 'copp',
        },
        dropp: {
          row: 6,
          col: 24,
          texture: 'dropp',
        },
      },
    },
    states: [
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          pippin: {
            rowDiff: -12,
          },
          rowan: {
            rowDiff: -11,
          },
          soldier1: {
            rowDiff: -10,
          },
          soldier2: {
            rowDiff: -10,
          },
          soldier3: {
            rowDiff: -10,
          },
          soldier4: {
            rowDiff: -10,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Hmm...If I remember correctly...',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'There should be two brothers who run this place.',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          rowan: {
            rowDiff: -5,
            colDiff: 5,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          rowan: {
            colDiff: -10,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'SWOOOOSH!~',
            screenShakeConfig: {
              duration: 500,
              intensity: 0.005,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          copp: {
            colDiff: 10,
            speed: 5,
          },
          dropp: {
            colDiff: -10,
            speed: 5,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          rowan: {
            rowDiff: 2,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Gah!',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          copp: {
            rowDiff: 1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Y'all managed to beat the rest of our squad...",
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'But they were rocking the Air Rodent 2s!',
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
            rowDiff: 1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Our Air Rodent 1s are on another level!',
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
    ],
  },
}

export const SECOND_LEVEL = {
  sceneType: SceneType.GAME,
  config: {
    preGameDialog: [
      {
        text: 'Your highness! Their speed shoes seem much upgraded!',
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.LEFT,
        },
      },
      {
        text: 'They appear to be able to move AND attack after already attacking!',
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.LEFT,
        },
      },
    ],
    camPosition: {
      row: 12,
      col: 12,
    },
    playerConfig: [
      {
        rowColPos: [12, 12],
        texture: 'pippin',
        name: 'Pippin',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [9, 5],
        texture: 'pt-boss',
        name: 'Rowan',
        moveRange: 4,
        attackRange: 4,
        maxHealth: 100,
        baseDamageAmount: 20,
        unitType: UnitTypes.RANGED,
      },
      {
        rowColPos: [14, 9],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [14, 8],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [14, 15],
        texture: 'rat1',
        name: 'Soldier 2',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [14, 16],
        texture: 'rat1',
        name: 'Soldier 3',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
    ],
    cpuConfig: [
      {
        rowColPos: [7, 10],
        texture: 'copp',
        name: 'Copp',
        moveRange: 10,
        attackRange: 1,
        maxHealth: 125,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
        maxExtraMoves: 2,
      },
      {
        rowColPos: [7, 14],
        texture: 'dropp',
        name: 'Dropp',
        moveRange: 10,
        attackRange: 1,
        maxHealth: 125,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
        maxExtraMoves: 2,
      },
    ],
    tileMapKey: 'cutscene-map',
  },
}

export const SECOND_LEVEL_VICTORY_CUTSCENE = {
  sceneType: SceneType.CUTSCENE,
  config: {
    initialState: {
      characterConfigs: {
        copp: {
          row: 2,
          col: 10,
          texture: 'copp',
        },
        dropp: {
          row: 2,
          col: 12,
          texture: 'dropp',
        },
        soldier1: {
          row: 4,
          col: 9,
          texture: 'rat1',
        },
        pippin: {
          row: 4,
          col: 11,
          texture: 'pippin',
        },
        soldier2: {
          row: 4,
          col: 13,
          texture: 'rat1',
        },
        soldier3: {
          row: 6,
          col: 11,
          texture: 'rat1',
        },
        rowan: {
          row: 2,
          col: 7,
          texture: 'pt-boss',
        },
        mac: {
          col: 24,
          row: 12,
          texture: 'mac',
        },
        invader1: {
          col: 24,
          row: 11,
          texture: 'rat2',
        },
        invader2: {
          col: 24,
          row: 13,
          texture: 'rat2',
        },
        invader3: {
          col: 24,
          row: 4,
          texture: 'rat2',
        },
        invader4: {
          col: 24,
          row: 5,
          texture: 'rat2',
        },
        invader5: {
          col: 24,
          row: 6,
          texture: 'rat2',
        },
        invader6: {
          col: 24,
          row: 7,
          texture: 'rat2',
        },
        invader7: {
          col: 24,
          row: 8,
          texture: 'rat2',
        },
        invader8: {
          col: 24,
          row: 9,
          texture: 'rat2',
        },
        invader9: {
          col: 24,
          row: 10,
          texture: 'rat2',
        },
        invader10: {
          row: 24,
          col: 9,
          texture: 'rat2',
        },
        invader11: {
          row: 24,
          col: 8,
          texture: 'rat2',
        },
        invader12: {
          row: 24,
          col: 7,
          texture: 'rat2',
        },
        invader13: {
          row: 24,
          col: 5,
          texture: 'rat2',
        },
        invader14: {
          row: 24,
          col: 4,
          texture: 'rat2',
        },
        invader15: {
          row: 24,
          col: 3,
          texture: 'rat2',
        },
      },
      camPosition: {
        row: 3,
        col: 12,
      },
    },
    states: [
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'How...How did you beat us?!',
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'We had the dopest shoes in the game...',
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Our drip was unmatched..',
            spriteConfig: {
              charKey: 'copp',
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
            text: "Clearly it wasn't!",
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          mac: {
            colDiff: -8,
          },
          invader1: {
            colDiff: -7,
          },
          invader2: {
            colDiff: -7,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          dropp: {
            rowDiff: -1,
          },
          copp: {
            rowDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Lord Mac!',
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "We...we didn't know you'd be dropping in!",
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          dropp: {
            sortOrder: 0,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
          copp: {
            sortOrder: 1,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          soldier3: {
            colDiff: -1,
          },
          pippin: {
            colDiff: 2,
            rowDiff: 3,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "You! You're with the scum that took my sister!",
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
          mac: {
            colDiff: -1,
            rowDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Ahh, Prince Pippin...',
            spriteConfig: {
              charKey: 'mac',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'So we finally meet at last!',
            spriteConfig: {
              charKey: 'mac',
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
            rowDiff: 4,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          pippin: {
            sortOrder: 0,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Where is she?! What have you done with her?!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
            screenShakeConfig: {
              duration: 500,
              intensity: 0.005,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          invader1: {
            rowDiff: -1,
            colDiff: -3,
          },
          invader2: {
            colDiff: -3,
            rowDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Your highness! Be careful!',
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          soldier1: {
            rowDiff: 6,
            colDiff: 4,
          },
          soldier2: {
            rowDiff: 5,
          },
          soldier3: {
            rowDiff: 6,
            colDiff: 3,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          rowan: {
            rowDiff: 2,
            colDiff: 2,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Pippin! Be careful! He's Naldo's right hand!",
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "We don't know what he's capable of!",
            spriteConfig: {
              charKey: 'rowan',
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
            text: 'Your little friend is right...',
            spriteConfig: {
              charKey: 'mac',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "You really don't!",
            spriteConfig: {
              charKey: 'mac',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          mac: {
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Your highness!',
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          soldier1: {
            rowDiff: 1,
          },
          pippin: {
            colDiff: -2,
          },
        },
      },
      {
        type: CutsceneStateTypes.SCREEN_EFFECT,
        config: {
          effectType: ScreenEffects.SHAKE_COLOR,
          config: {
            color: 0xff0000,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'RODERCK!!!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'NOOOO!',
            spriteConfig: {
              charKey: 'pippin',
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
            text: 'It...it was an honor...your highness...',
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          soldier1: {
            sortOrder: 0,
            animType: AnimationTypes.FADE_OUT,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Hah! Die you worm!',
            spriteConfig: {
              charKey: 'mac',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Soldiers! Bring me the prince alive!',
            spriteConfig: {
              charKey: 'mac',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Kill the rest!',
            spriteConfig: {
              charKey: 'mac',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          invader3: {
            colDiff: -3,
          },
          invader4: {
            colDiff: -4,
          },
          invader5: {
            colDiff: -3,
          },
          invader6: {
            colDiff: -5,
          },
          invader7: {
            colDiff: -3,
          },
          invader8: {
            colDiff: -4,
          },
          invader9: {
            colDiff: -3,
          },
          mac: {
            colDiff: 100,
          },
          invader10: {
            rowDiff: -10,
          },
          invader11: {
            rowDiff: -11,
          },
          invader12: {
            rowDiff: -10,
          },
          invader13: {
            rowDiff: -10,
          },
          invader14: {
            rowDiff: -11,
          },
          invader15: {
            rowDiff: -10,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          copp: {
            sortOrder: 0,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
          dropp: {
            sortOrder: 1,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "I think it's time for us to bounce!",
            spriteConfig: {
              charKey: 'copp',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'I was just about to say the same thing, bro!',
            spriteConfig: {
              charKey: 'dropp',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          copp: {
            rowDiff: -1,
            colDiff: -100,
            speed: 10,
          },
          dropp: {
            rowDiff: -1,
            colDiff: 100,
            speed: 10,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          soldier2: {
            rowDiff: 2,
          },
          soldier3: {
            colDiff: -5,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Here they come!',
            spriteConfig: {
              charKey: 'soldier2',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "This isn't looking good!",
            spriteConfig: {
              charKey: 'soldier2',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "There's way too many of them!",
            spriteConfig: {
              charKey: 'soldier2',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          rowan: {
            rowDiff: 5,
            colDiff: 2,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          rowan: {
            sortOrder: 0,
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Here! Take these!',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'I swiped them from back there...',
            spriteConfig: {
              charKey: 'rowan',
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
            rowDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'These are the shoes they were wearing!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Yes! These should let you run right past these guys!',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          pippin: {
            sortOrder: 0,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "But there's only one pair of them!",
            spriteConfig: {
              charKey: 'pippin',
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
            text: 'Your highness! Take them quickly!',
            spriteConfig: {
              charKey: 'soldier2',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "There's no time! We'll hold them off long enough!",
            spriteConfig: {
              charKey: 'soldier3',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          pippin: {
            sortOrder: 0,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'We need to hurry!',
            spriteConfig: {
              charKey: 'rowan',
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
            text: '...',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Mac...',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Naldo!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'All of you will pay!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              postiion: SpeakerPosition.LEFT,
            },
            screenShakeConfig: {
              duration: 500,
              intensity: 0.005,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.SCREEN_EFFECT,
        config: {
          effectType: ScreenEffects.FADE_TO_BLACK,
        },
      },
    ],
  },
}

export const SHOE_CASTLE_LEVEL = {
  prereqs: ['Pop Topic'],
  levelName: 'Shoe Castle',
  scenes: [
    OPENING_CUTSCENE,
    FIRST_LEVEL,
    FIRST_LEVEL_VICTORY_CUTSCENE,
    SECOND_LEVEL,
    SECOND_LEVEL_VICTORY_CUTSCENE,
  ],
}
