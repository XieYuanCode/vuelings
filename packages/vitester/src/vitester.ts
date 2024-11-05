import { Vitest, createVitest } from 'vitest/node'
import { TesterProvider, IReporterProvider } from "@vuelings/core/model"
import { tester } from "@vuelings/core/decorator"
import VuelingsVitestReporter from "./reporter.js"

@tester()
export class VitesterProvider extends TesterProvider {
  public vitestInstance?: Vitest;

  constructor(
    private _reporter: IReporterProvider
  ) {
    super()
  }

  async init(cwd: string): Promise<void> {
    await super.init(cwd)

    this.vitestInstance = await createVitest('test', {
      watch: true,
      dom: true,
      dir: cwd,
      reporters: [new VuelingsVitestReporter(this._reporter)]
    })
  }
}