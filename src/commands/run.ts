import { greeting } from "../common/console.js";
import { hasDotVuelingsFile } from "../common/file.js";
import exerciseManager from "../exercise/exerciseManager.js";
import { BaseCommand } from "./index.js";
// import { createVitest } from "vitest/node"

export default class RunCommand extends BaseCommand<string> {
  static register(cwd: string) {
    return new RunCommand(cwd)
  }

  constructor(cwd: string) {
    super(cwd, "run [name]", [], "Run a single exercise. Runs the next pending exercise if the exercise name is not specified")
  }

  async handle(args?: string) {
    const isValidFolder = hasDotVuelingsFile(this.cwd);

    if (!isValidFolder) {
      greeting();
      return;
    }

    if (args) {
      await exerciseManager.runExercise(args)
    } else {
      exerciseManager.continueNextPendingExercise()
    }
  }
}