import { RunnerTestFile, TaskResultPack, UserConsoleLog } from "vitest";
import { Vitest } from "vitest/node.js";
import { BasicReporter, DefaultReporter } from "vitest/reporters";
import { printHintOnFailed } from "../common/console.js";

/**
 * 自定义单元测试报告期
 */
export default class VuelingsVitestReporter extends DefaultReporter {
  /**
   * 设置上下文
   * @param ctx 
   */
  onInit(ctx: Vitest): void {
    this.ctx = ctx
  }

  /**
   * 重写onWatcherStart
   * 主要是覆盖掉默认的 hint 字段，从而使用自定义的 hint
   * @param files 
   * @param errors 
   */
  async onWatcherStart(): Promise<void> { }

  /**
   * 测试运行个完成回调，跟据结果展示自定义的 hint
   * @param files 
   * @param errors 
   */
  onFinished(files?: RunnerTestFile[], errors?: unknown[]): void {
    super.onFinished()

    const taskState = files && files[0].result?.state

    if (!taskState) { return }

    switch (taskState) {
      case 'fail':
        printHintOnFailed()
        break;

      default:
        break;
    }
  }
}