import { program } from "commander";
import InitCommand from "./commands/init.js";
import RunCommand from "./commands/run.js";
import DefaultCommand from "./commands/default.js";
import { initJsonData } from "./db/db.js";
import vitester from "./vitest/index.js";
import exerciseManager from "./exercise/exerciseManager.js";
import { BaseCommand } from "./commands/index.js";
import { registerCommands } from "./common/command.js";

(async () => {
  // const cwd = process.cwd()
  // TODO: 测试阶段
  const cwd = "/Users/xieyuan/code/personal/vuelings/template"

  // 命令集合
  const commands: Array<typeof BaseCommand<unknown>> = [
    DefaultCommand,
    InitCommand,
    RunCommand
  ]
  // 一次性注册所有命令
  registerCommands(commands, cwd)

  // 一些异步的初始化任务
  const  asyncTasks = [
    initJsonData(), // 数据持久化系统
    vitester.init(cwd), // 测试系统初始化
    exerciseManager.init(cwd) // 测试管理器
  ]
  await Promise.all(asyncTasks)

  program.parseAsync();
})()
