import { UnitTypes } from '~/core/units/UnitConstants'
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

const GAME_CONFIG = {
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
        maxHealth: 50,
        baseDamageAmount: 25,
        unitType: UnitTypes.PHYSICAL,
      },
    ],
    cpuConfig: [
      {
        rowColPos: [5, 5],
        texture: 'pop-topic-soldier',
        name: 'Enemy 1',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.RANGED,
      },
      {
        rowColPos: [4, 6],
        texture: 'pop-topic-soldier',
        name: 'Enemy 2',
        moveRange: 5,
        attackRange: 1,
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
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.RANGED,
      },
      {
        rowColPos: [5, 18],
        texture: 'pop-topic-soldier',
        name: 'Enemy 7',
        moveRange: 5,
        attackRange: 1,
        maxHealth: 50,
        baseDamageAmount: 10,
        unitType: UnitTypes.RANGED,
      },
    ],
    tileMapKey: 'pop-topic-map',
  },
}

export const POP_TOPIC_LEVEL = {
  prereqs: ['Pippin Dots'],
  levelName: 'Pop Topic',
  scenes: [GAME_CONFIG],
}
