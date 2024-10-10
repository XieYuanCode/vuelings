import { program } from "commander";
import InitCommand from "./commands/init";
import RunCommand from "./commands/run";
// import runCommandDescriptor from "./commands/run";

program
  .name("vuelings");

InitCommand.register()
RunCommand.register()


program.parseAsync();
