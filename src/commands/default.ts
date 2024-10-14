import { hasDotVuelingsFile } from "../common/file.js";
import { greeting } from "../common/utils.js";
import exerciseManager from "../exercise/exerciseManager.js";
import { BaseCommand } from "./index.js";

export default class DefaultCommand extends BaseCommand {
  static register() {
    return new DefaultCommand()
  }

  async handle() {
    // TODO:测试阶段 使用 template 目录
    const cwd = "/Users/xieyuan/code/personal/vuelings/template"
    // const cwd = process.cwd()

    const isValidFolder = hasDotVuelingsFile(cwd);

    if (!isValidFolder) {
      greeting();
      return;
    }

    exerciseManager.init(cwd)

    exerciseManager.continueNextPendingExercise()
  }
}