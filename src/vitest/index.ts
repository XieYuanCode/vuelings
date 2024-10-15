import { TaskResult } from 'vitest';
import { createVitest, Vitest } from 'vitest/node'
import VuelingsVitestReporter from './reporter.js';


class Vitester {
  public vitestInstance?: Vitest;

  public async init(dir: string) {
    this.vitestInstance = await createVitest('test', {
      watch: true,
      dom: true,
      dir,
      reporters: [new VuelingsVitestReporter()]
    })
  }

  public async runSingleTest(testFile: string): Promise<TaskResult | undefined> {
    if (!this.vitestInstance) return;

    await this.vitestInstance.start([testFile])

    const [fileTask] = this.vitestInstance.state.getFiles();

    if (fileTask.filepath !== testFile) return;

    return fileTask.result
  }
}

const vitester = new Vitester()

export default vitester;