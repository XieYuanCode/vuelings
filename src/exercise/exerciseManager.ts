import { Exercise } from "./exercise";

export class ExerciseManager {
  private _exercises: Exercise[] = []

  public getExercise(name: string) { 
    return this._exercises.filter(exercise => exercise.name === name);
  }

  public getNextPendingExercise() {

  }

  public getExerciseProgress() {}
}