/**
 * 报告器
 */
export interface IReporterProvider {
  onTestFailed: (/** TODO */) => void
}

export abstract class ReporterProvider implements IReporterProvider {
  onTestFailed() {}
}