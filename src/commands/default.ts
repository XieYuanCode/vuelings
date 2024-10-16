import { greeting } from "../common/console.js";
import { hasDotVuelingsFile } from "../common/file.js";
import exerciseManager from "../exercise/exerciseManager.js";
import { BaseCommand } from "./index.js";

export default class DefaultCommand extends BaseCommand {
  static register(cwd: string) {
    return new DefaultCommand(cwd)
  }

  async handle() {
    const isValidFolder = hasDotVuelingsFile(this.cwd);

    if (!isValidFolder) {
      greeting();
      return;
    }

    exerciseManager.continueNextPendingExercise()
  }
}