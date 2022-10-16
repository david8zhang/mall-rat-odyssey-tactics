import { SpeakerPosition } from '../dialog/DialogConstants'

export enum CutsceneStateTypes {
  DIALOG = 'DIALOG',
  CHARACTER_MOVEMENT = 'CHARACTER_MOVEMENT',
  CHARACTER_ANIM = 'CHARACTER_ANIM',
}

export interface CutSceneDialogLine {
  text: string
  screenShakeConfig?: {
    duration: number
    intensity: number
  }
  spriteConfig?: {
    charKey: string
    scale?: number
    position?: SpeakerPosition
  }
}

export interface CutsceneCharacterConfig {
  row: number
  col: number
  texture?: string
  camFocus?: boolean
}
