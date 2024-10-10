import * as path from "node:path";
import { ExerciseCategory } from "./ExerciseCategory";

export class Exercise {
  public get name() : string {
    return path.basename(this.sourceFile)
  }
  
  constructor(
    public sourceFile: string,
    public readonly category: ExerciseCategory
  ) {
    
  }
}