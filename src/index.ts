import { program } from "commander";
import InitCommand from "./commands/init.ts";
import RunCommand from "./commands/run.ts";
import DefaultCommand from "./commands/default.ts";
import { initJsonData } from "./db/db.ts";
import vitester from "./vitest/index.ts";
import exerciseManager from "./exercise/exerciseManager.ts";
import { BaseCommand } from "./commands/index.ts";
import { registerCommands } from "./common/command.ts";

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
