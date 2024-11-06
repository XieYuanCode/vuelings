import { Vitest, createVitest } from 'vitest/node'
import { IReporterProvider, ITesterProvider, IExecuteResult } from "@vuelings/core/model"
import { TesterProvider, Inject } from "@vuelings/core/di/decorators.js"
import VuelingsVitestReporter from "./reporter.js"
import { TYPES } from '@vuelings/core/model/types.js';

@TesterProvider()
export class VitesterProvider implements ITesterProvider {
  public vitestInstance?: Vitest;

  constructor(
    @Inject(TYPES.ReporterProvider) private _reporter: IReporterProvider
  ) { }

  async init(cwd: string) {
    this.vitestInstance = await createVitest('test', {
      watch: true,
      dom: true,
      dir: cwd,
      reporters: [new VuelingsVitestReporter(this._reporter)]
    })
  }

  async runSingleTest() {
    return "" as IExecuteResult
  }
}