import { hasDotVuelingsFile } from "../common/file.js";
import { greeting } from "../common/utils.js";
import exerciseManager from "../exercise/exerciseManager.js";
import { BaseCommand } from "./index.js";
import blessed from "blessed"
// import { createVitest } from "vitest/node"

export default class RunCommand extends BaseCommand<string> {
  static register() {
    return new RunCommand()
  }

  constructor() {
    super("run [name]", [], "Run a single exercise. Runs the next pending exercise if the exercise name is not specified")
  }

  async handle(args?: string) {
    console.log("args!!!", args);
    // TODO:测试阶段 使用 template 目录
    const cwd = "/Users/xieyuan/code/personal/vuelings/template"
    // const cwd = process.cwd()

    const isValidFolder = hasDotVuelingsFile(cwd);

    if (!isValidFolder) {
      greeting();
      return;
    }

    exerciseManager.init(cwd)

    if(args) {
      exerciseManager.runExercise(args)
    } else {
      exerciseManager.continueNextPendingExercise()
    }

  }
}