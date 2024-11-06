
export interface IExecuteResult {

}
export interface ITesterProvider {
  init: (cwd: string) => Promise<void>

  runSingleTest: (/** TODO:exercise */) => Promise<IExecuteResult>
}