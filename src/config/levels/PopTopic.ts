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
        mai: {
          row: 5,
          col: 10,
          texture: 'pt-boss',
        },
        kimiko: {
          row: 5,
          col: 12,
          texture: 'pt-boss',
        },
        rowan: {
          row: 5,
          col: 14,
          texture: 'pt-boss',
        },
        ptSoldier1: {
          row: 11,
          col: 0,
          texture: 'pop-topic-soldier',
        },
      },
    },
    states: [
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "Dude...I'm just gonna come out and say it. I DON'T like My He-Roach Academia.",
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
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          ptSoldier1: {
            colDiff: 12,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Your edginess! Visitors from the Kingdom of Pippin Dots are at the gates!',
            spriteConfig: {
              charKey: 'ptSoldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'They bring with them soldiers!',
            spriteConfig: {
              charKey: 'ptSoldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'They claim to come in peace...',
            spriteConfig: {
              charKey: 'ptSoldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          kimiko: {
            colDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'They must be here for information regarding their princess...',
            spriteConfig: {
              charKey: 'kimiko',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'Yes. And we must honor our deal with...HIM.',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Should we tell him to go away then?',
            spriteConfig: {
              charKey: 'kimiko',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'No. He may get suspicious...',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'We need to deal with him now!',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          mai: {
            rowDiff: 1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Ready the Mages! We will take them by surprise!',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'They will be no match for our dark Angst Magic!',
            spriteConfig: {
              charKey: 'mai',
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
            text: 'Yes, your edginess! Right away!',
            spriteConfig: {
              charKey: 'ptSoldier1',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          ptSoldier1: {
            colDiff: -100,
          },
        },
      },
      {
        type: CutsceneStateTypes.TRANSITION,
        config: {
          newState: {
            characterConfigs: {
              ptSoldier1: {
                row: 5,
                col: 10,
                texture: 'pop-topic-soldier',
              },
              ptSoldier2: {
                row: 5,
                col: 12,
                texture: 'pop-topic-soldier',
              },
              ptSoldier3: {
                row: 0,
                col: 14,
                texture: 'pop-topic-soldier',
              },
              ptArcher1: {
                row: 0,
                col: 16,
                texture: 'pop-topic-soldier',
              },
              ptArcher2: {
                row: 0,
                col: 8,
                texture: 'pop-topic-soldier',
              },
              pippin: {
                row: 12,
                col: 12,
                texture: 'rat1',
              },
              soldier1: {
                row: 14,
                col: 0,
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
            },
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "I don't like this...",
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'They are planning something back there...',
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Indeed...',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          ptSoldier3: {
            rowDiff: 5,
            colDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          ptSoldier2: {
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
            sortOrder: 0,
          },
        },
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          ptSoldier3: {
            colDiff: 1,
          },
          ptSoldier2: {
            rowDiff: 1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Alright! You may enter, but watch yourselves!',
            spriteConfig: {
              charKey: 'ptSoldier1',
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
            colDiff: 10,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Your highness! It is as you predicted!',
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'I was able to see them preparing for attack!',
            spriteConfig: {
              charKey: 'soldier1',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "It's a trap!",
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
          ptSoldier2: {
            rowDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'The jig is up! Mages cast at will!',
            spriteConfig: {
              charKey: 'ptSoldier2',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Harness the power of your dark Angst!',
            spriteConfig: {
              charKey: 'ptSoldier2',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          ptArcher1: {
            rowDiff: 5,
          },
          ptArcher2: {
            rowDiff: 5,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'This is it soldiers! Prepare for battle!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.RIGHT,
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
        text: "Your highness, they've got mages in the back.",
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.LEFT,
        },
      },
      {
        text: "They're using powerful witch magic...",
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.LEFT,
        },
      },
      {
        text: 'It seems to give them the ability to attack from behind walls!',
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.LEFT,
        },
      },
      {
        text: 'I recommend caution when approaching.',
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.LEFT,
        },
      },
    ],
    camPosition: {
      row: 11,
      col: 12,
    },
    playerConfig: [
      {
        rowColPos: [18, 7],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [18, 9],
        texture: 'rat1',
        name: 'Soldier 2',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [18, 15],
        texture: 'rat1',
        name: 'Soldier 3',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [18, 17],
        texture: 'rat1',
        name: 'Soldier 4',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [17, 12],
        texture: 'pippin',
        name: 'Pippin',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
    ],
    cpuConfig: [
      {
        rowColPos: [5, 5],
        texture: 'pop-topic-soldier',
        name: 'Enemy 1',
        moveRange: 3,
        attackRange: 4,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.RANGED,
      },
      {
        rowColPos: [4, 6],
        texture: 'pop-topic-soldier',
        name: 'Enemy 2',
        moveRange: 3,
        attackRange: 4,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.RANGED,
      },
      {
        rowColPos: [6, 10],
        texture: 'pop-topic-soldier',
        name: 'Enemy 3',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [6, 12],
        texture: 'pop-topic-soldier',
        name: 'Enemy 4',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [6, 14],
        texture: 'pop-topic-soldier',
        name: 'Enemy 5',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [4, 17],
        texture: 'pop-topic-soldier',
        name: 'Enemy 6',
        moveRange: 3,
        attackRange: 4,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.RANGED,
      },
      {
        rowColPos: [5, 18],
        texture: 'pop-topic-soldier',
        name: 'Enemy 7',
        moveRange: 3,
        attackRange: 4,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.RANGED,
      },
    ],
    tileMapKey: 'pop-topic-map',
  },
}

export const FIRST_LEVEL_VICTORY_CUTSCENE = {
  sceneType: SceneType.CUTSCENE,
  config: {
    initialState: {
      characterConfigs: {
        mai: {
          row: 5,
          col: 10,
          texture: 'pt-boss',
        },
        kimiko: {
          row: 5,
          col: 12,
          texture: 'pt-boss',
        },
        rowan: {
          row: 5,
          col: 14,
          texture: 'pt-boss',
        },
        pippin: {
          row: 100,
          col: 12,
          texture: 'pippin',
        },
        soldier1: {
          row: 100,
          col: 9,
          texture: 'rat1',
        },
        soldier2: {
          row: 100,
          col: 10,
          texture: 'rat1',
        },
        soldier3: {
          row: 100,
          col: 14,
          texture: 'rat1',
        },
        soldier4: {
          row: 100,
          col: 15,
          texture: 'rat1',
        },
      },
    },
    states: [
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          pippin: {
            rowDiff: -8,
          },
          soldier1: {
            rowDiff: -6,
          },
          soldier2: {
            rowDiff: -7,
          },
          soldier3: {
            rowDiff: -7,
          },
          soldier4: {
            rowDiff: -6,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'So, you managed to get past our defenses...',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'No matter...My sisters and I will crush you!',
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

export const SECOND_LEVEL = {
  sceneType: SceneType.GAME,
  config: {
    preGameDialog: [
      {
        text: 'Your highness! They appear to have a much larger attack range than our previous foes...',
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.RIGHT,
        },
      },
      {
        text: 'I recommend we try to close the distance as quickly as we can!',
        spriteConfig: {
          texture: 'rat1',
          scale: 3,
          position: SpeakerPosition.RIGHT,
        },
      },
    ],
    camPosition: {
      row: 12,
      col: 12,
    },
    playerConfig: [
      {
        rowColPos: [18, 9],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [17, 10],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [16, 12],
        texture: 'pippin',
        name: 'Pippin',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 75,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [17, 14],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
      {
        rowColPos: [18, 15],
        texture: 'rat1',
        name: 'Soldier 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
    ],
    cpuConfig: [
      {
        rowColPos: [5, 10],
        texture: 'pt-boss',
        name: 'Mai',
        moveRange: 4,
        attackRange: 4,
        maxHealth: 125,
        baseDamageAmount: 20,
        unitType: UnitTypes.RANGED,
      },
      {
        rowColPos: [5, 12],
        texture: 'pt-boss',
        name: 'Kimiko',
        moveRange: 4,
        attackRange: 4,
        maxHealth: 125,
        baseDamageAmount: 20,
        unitType: UnitTypes.RANGED,
      },
      {
        rowColPos: [5, 14],
        texture: 'pt-boss',
        name: 'Rowan',
        moveRange: 4,
        attackRange: 4,
        maxHealth: 125,
        baseDamageAmount: 20,
        unitType: UnitTypes.RANGED,
      },
    ],
    tileMapKey: 'cutscene-map',
  },
}

const SECOND_LEVEL_VICTORY_CUTSCENE = {
  sceneType: SceneType.CUTSCENE,
  config: {
    initialState: {
      characterConfigs: {
        mai: {
          row: 1,
          col: 12,
          texture: 'pt-boss',
        },
        kimiko: {
          row: 1,
          col: 11,
          texture: 'pt-boss',
        },
        rowan: {
          row: 1,
          col: 13,
          texture: 'pt-boss',
        },
        pippin: {
          row: 3,
          col: 12,
          texture: 'pippin',
        },
        soldier1: {
          row: 3,
          col: 10,
          texture: 'rat1',
        },
        soldier2: {
          row: 3,
          col: 14,
          texture: 'rat1',
        },
        soldier3: {
          row: 1,
          col: 9,
          texture: 'rat1',
        },
        soldier4: {
          row: 1,
          col: 15,
          texture: 'rat1',
        },
      },
      camPosition: {
        row: 1,
        col: 12,
      },
    },
    states: [
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          mai: {
            sortOrder: 0,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
          kimiko: {
            sortOrder: 1,
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
            delay: 10,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Okay! We yield! We yield!',
            spriteConfig: {
              charKey: 'mai',
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
            rowDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Tell us everything you know about the kidnappers who took my sister!',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          mai: {
            rowDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Okay! We made a deal with them!',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'They gave us these lace gloves and bracelets!',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "It's the source of our dark magic!",
            spriteConfig: {
              charKey: 'mai',
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
            text: "Who are 'they'?!",
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'And where did they come from?',
            spriteConfig: {
              charKey: 'pippin',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_MOVEMENT,
        config: {
          rowan: {
            colDiff: -1,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "We don't know exactly who 'they' are.",
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'All we know is their leader is incredibly powerful...',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'He calls himself...Naldo!',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          mai: {
            sortOrder: 0,
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Rowan! Shut up!',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'He said he would kill us if we spoke his name to another!',
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          rowan: {
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "No! I've been quiet long enough!",
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'All day I listen to you two bicker!',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'We let Naldo manipulate us with these...trinkets!',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          mai: {
            animType: AnimationTypes.SHAKE_SIDE_TO_SIDE,
            sortOrder: 0,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: "You don't know what you're trifling with, Rowan!",
            spriteConfig: {
              charKey: 'mai',
              scale: 3,
              position: SpeakerPosition.RIGHT,
            },
          },
          {
            text: 'What if he finds out and comes for us?!',
            spriteConfig: {
              charKey: 'mai',
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
            text: 'He may be powerful, but maybe this Pippin Dots kid has a chance!',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "After all, he got this far didn't he? He defeated all of us!",
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
        ],
      },
      {
        type: CutsceneStateTypes.CHARACTER_ANIM,
        config: {
          rowan: {
            animType: AnimationTypes.JUMP_UP_AND_DOWN,
            sortOrder: 0,
          },
        },
      },
      {
        type: CutsceneStateTypes.DIALOG,
        config: [
          {
            text: 'Listen! Go to the Shoe Castle.',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: 'Naldo and his cronies went that way after taking your sister!',
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
            },
          },
          {
            text: "We don't know where Naldo came from, but maybe they do!",
            spriteConfig: {
              charKey: 'rowan',
              scale: 3,
              position: SpeakerPosition.LEFT,
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

export const POP_TOPIC_LEVEL = {
  prereqs: ['Pippin Dots'],
  levelName: 'Pop Topic',
  scenes: [
    FIRST_LEVEL,
    // OPENING_CUTSCENE,
    // FIRST_LEVEL,
    // FIRST_LEVEL_VICTORY_CUTSCENE,
    // SECOND_LEVEL,
    // SECOND_LEVEL_VICTORY_CUTSCENE,
  ],
}
