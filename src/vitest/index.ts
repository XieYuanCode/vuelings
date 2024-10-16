import { TaskResult } from 'vitest';
import { createVitest, Vitest } from 'vitest/node'
import VuelingsVitestReporter from './reporter.js';


/**
 * 单元测试
 */
class Vitester {
  public vitestInstance?: Vitest;

  /**
   * 初始化
   * 主要负责扫描目录下所有的测试案例，同时创建 vitest 实例
   * @param dir 
   */
  public async init(dir: string) {
    this.vitestInstance = await createVitest('test', {
      watch: true,
      dom: true,
      dir,
      reporters: [new VuelingsVitestReporter()]
    })
  }

  /**
   * 运行耽搁测试
   * @param testFile 需要测试的测试文件
   * @returns 
   */
  public async runSingleTest(testFile: string): Promise<TaskResult | undefined> {
    if (!this.vitestInstance) return;

    await this.vitestInstance.start([testFile])

    const [fileTask] = this.vitestInstance.state.getFiles();

    if (fileTask.filepath !== testFile) return;

    return fileTask.result
  }
}

// 单例
const vitester = new Vitester()
export default vitester;