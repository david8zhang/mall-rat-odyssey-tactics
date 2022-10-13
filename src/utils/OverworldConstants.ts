export interface OverworldLevelConfig {
  hasCompleted: boolean
  levelName: string
}

export interface OverworldConfig {
  currLevelIdx: number
  levelConfig: OverworldLevelConfig[]
}
