import { BaseCommand } from "./index";

export default class RunCommand extends BaseCommand<string> {
  static register() {
    return new RunCommand()
  }

  constructor() {
    super("run [name]", [], "Run a single exercise. Runs the next pending exercise if the exercise name is not specified")
  }

  async handle(args?: string) {
    console.log("args!!!", args);

    const vitest = await import("vitest/node")

    console.log(vitest);
    // const vitest = await createVitest('test', {
    //   watch: true
    // })

    // console.log(vitest);
  }
}