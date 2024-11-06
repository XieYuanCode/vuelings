import * as path from "node:path";
import type { FSWatcher } from "node:fs"
import { startWatchFileChanged } from "../common/watcher.js";
import { debounce } from "../common/debounce.js";
import { getTestFileFromVueFile } from "../common/file.js";
import { DIContainer } from "../di/container.js";
import { ClassType } from "../decorator/factory.js";
import { ITesterProvider } from "../model/tester.js";

/**
 * 测试状态
 */
export enum ExerciseStatus {
  /**
   * 未开始
   */
  NotStart = 0,
  /**
   * 通过
   */
  Pass = 2,
  /**
   * 运行中
   */
  Running = 3
}

/**
 * 测验
 */
export class Exercise {
  /**
   * 从 vue 文件解析出一个测验实例
   * @param sourceVueFile 
   * @returns 
   */
  static fromSourceFile(sourceVueFile: string): Exercise {
    const exercise = new Exercise(sourceVueFile);

    return exercise;
  }

  /**
   * fs watcher
   */
  private _watcher: FSWatcher | undefined;

  /**
   * 失败后帮助信息
   */
  public helpMessageOnFailed?: string

  /**
   * 测验当前状态
   * 默认为未开始
   */
  public status: ExerciseStatus = ExerciseStatus.NotStart

  /**
   * 测验名
   * 唯一
   */
  public get name(): string {
    return path.basename(this.sourceFile, '.vue')
  }

  /**
   * 单元测试文件
   */
  public get testFile(): string | undefined {
    return getTestFileFromVueFile(this.sourceFile)
  }

  /**
   * 测试目录
   */
  public get dir(): string {
    return path.dirname(this.sourceFile)
  }

  constructor(
    public sourceFile: string,
  ) { }

  /**
   * 当vue 源码变化后的回调
   */
  private _onSourceFileChanged() {
    this.test()
  }

  /**
   * 初始化 fs watcher
   */
  private _initSourceFileWatcher() {
    this._watcher = startWatchFileChanged(this.sourceFile, debounce(this._onSourceFileChanged.bind(this), 1000, true))
  }

  /**
   * 关闭 fs watcher
   */
  private _disposeSourceFileWatcher() {
    this._watcher && this._watcher.close()

    this._watcher = undefined
  }

  /**
   * 运行单元测试
   * @returns 测试结果
   */
  private async test() {
    // TODO: call vitest api to retest vue file
    console.log("Testing Exercise", this.name);
    if (!this.testFile) return;

    const tester = DIContainer.resolve<ITesterProvider>(ClassType.TESTER)
    if (!tester) return;
    const testResult = await tester.runSingleTest(this.testFile)

    console.log("testResult", testResult?.state);
  }

  /**
   * 运行测验
   */
  public async run() {
    console.log("Running Exercise: ", this.name);
    // 设置状态
    this.status = ExerciseStatus.Running
    // 初始化文件监听
    // this._initSourceFileWatcher()

    await this.test()
  }

  /**
   * 完成测验
   */
  public done() {
    // 更新已完成的测验
    updatePassedExercise(this.name, true)

    this._disposeSourceFileWatcher()
  }
}