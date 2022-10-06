export class Blackboard {
  public dataDictionary: Map<string, any>
  constructor() {
    this.dataDictionary = new Map()
  }

  public setData(key: string, data: any) {
    this.dataDictionary.set(key, data)
  }

  public getData(key: string): any {
    return this.dataDictionary.get(key)
  }
}
