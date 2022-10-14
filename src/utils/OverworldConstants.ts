export interface OverworldLevelConfig {
  levelName: string
}

export interface OverworldConfig {
  currLevelIdx: number
  levelConfig: OverworldLevelConfig[]
}
