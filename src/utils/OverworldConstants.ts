export interface OverworldLevelConfig {
  prereqs: string[]
  levelName: string
}

export interface OverworldConfig {
  currLevelIdx: number
  levelConfig: OverworldLevelConfig[]
}
