export enum CutsceneStateTypes {
  DIALOG = 'DIALOG',
  CHARACTER_MOVEMENT = 'CHARACTER_MOVEMENT',
}

export interface CutsceneCharacterConfig {
  row: number
  col: number
  texture?: string
  camFocus?: boolean
}
