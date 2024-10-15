import { RunnerTestFile, TaskResultPack, UserConsoleLog } from "vitest";
import { Vitest } from "vitest/node.js";
import { BasicReporter, DefaultReporter } from "vitest/reporters";
import { printHintOnFailed } from "../common/console.js";

export default class VuelingsVitestReporter extends DefaultReporter {
  onInit(ctx: Vitest): void {
    this.ctx = ctx
  }
  async onWatcherStart(files?: RunnerTestFile[], errors?: unknown[]): Promise<void> {
  }
  onFinished(files?: RunnerTestFile[], errors?: unknown[]): void {
    super.onFinished()

    const isFailed = files && files[0].result?.state === 'fail'

    if (isFailed) {
      printHintOnFailed()
    }
  }
}