import { program } from "commander";
import InitCommand from "./commands/init.js";
import RunCommand from "./commands/run.js";
import DefaultCommand from "./commands/default.js";
import { initJsonData } from "./db/db.js";

initJsonData().then(() => {
  program
    .name("vuelings");

  DefaultCommand.register()
  InitCommand.register()
  RunCommand.register()

  program.parseAsync();
})

