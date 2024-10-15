import { program } from "commander";
import InitCommand from "./commands/init.js";
import RunCommand from "./commands/run.js";
import DefaultCommand from "./commands/default.js";
import { initJsonData } from "./db/db.js";
import vitester from "./vitest/index.js";

(async () => {
  // const cwd = process.cwd()
  // TODO: 测试阶段
  const cwd = "/Users/xieyuan/code/personal/vuelings/template"

  await initJsonData()
  await vitester.init(cwd)

  DefaultCommand.register(cwd)
  InitCommand.register(cwd)
  RunCommand.register(cwd)

  program.parseAsync();
})()
