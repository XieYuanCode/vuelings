import * as path from "node:path";

export class ExerciseCategory {
  public get name() : string {
    return path.basename(this.folder) 
  }
  
  constructor(
    public readonly folder: string
  ) {

  }
}