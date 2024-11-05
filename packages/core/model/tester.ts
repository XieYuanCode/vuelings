export interface ITesterProvider<ExecuteResult = void> {
  init: (cwd: string) => Promise<void>

  runSingleTest: (/** TODO:exercise */) => Promise<ExecuteResult>
}

export abstract class TesterProvider implements ITesterProvider {
  async init(cwd: string) { }
  async runSingleTest() { }
}

