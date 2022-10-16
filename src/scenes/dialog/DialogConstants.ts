export enum SpeakerPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface DialogLine {
  text: string
  screenShakeConfig?: {
    duration: number
    intensity: number
  }
  spriteConfig?: {
    texture?: string
    charKey?: string
    scale?: number
    position?: SpeakerPosition
  }
}

export interface DialogConfig {
  speakerTexture: string
  spriteConfig?: {
    scale: number
  }
  dialogLines: DialogLine[]
}
