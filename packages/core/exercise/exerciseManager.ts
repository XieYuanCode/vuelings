import { exitWithError, printSuccessLog } from "../common/console.js";
import { getExercisesSourceFiles, getExercisesFolder } from "../common/file.js";
import { getPassed } from "../db/db.js";
import { Exercise } from "./exercise.js";
import colors from "colors"

/**
 * 测验管理器
 */
class ExerciseManager {
  /**
   * 初始化
   * @param cwd 运行目录 
   * @returns 
   */
  public async init(cwd: string) {
    // 获取测试存放目录
    const exercisesFolder = getExercisesFolder(cwd)

    if (!exercisesFolder) {
      return;
    }

    // 获取所有符合要求的 vue 文件（源文件）
    const exerciseSourceFiles = await getExercisesSourceFiles(exercisesFolder);

    // 构建 Exercise 实例并且存入 _exercises
    this._exercises = exerciseSourceFiles.map(eSF => Exercise.fromSourceFile(eSF));

    console.log("Exercises: ", this._exercises.map(e => e.name));
  }

  /**
   * 测验集合
   */
  private _exercises: Exercise[] = []

  /**
   * 根据 name 获取指定测验
   * @param name 
   * @returns 
   */
  public getExercise(name: string) {
    return this._exercises.filter(exercise => exercise.name === name)[0];
  }

  /**
   * 根据 name 获取指定测验index
   * @param name 
   * @returns 
   */
  public getExerciseIndex(name: string): number {
    return this._exercises.findIndex(e => e.name === name)

  }

  /**
   * 获取下一个待进行的的测验
   * @returns 
   */
  public getNextPendingExercise(): Exercise | undefined {
    const passed = getPassed() || [] // 获取通过的测验集合

    if (passed.length === this._exercises.length) { // 如果通过的测验数量等于总测验数量，代表完成所有测验
      printSuccessLog('Congratulations you have completed all vue exercises!')
      return
    }

    // 获得当前最新通过的测验的 index
    const currentIndex = this.getExerciseIndex(passed[passed.length - 1])

    // 返回下一个测验，即最新待进行的测验
    return this._exercises[currentIndex + 1]
  }

  /**
   * 获取测验进度
   */
  public getExerciseProgress() {

  }

  /**
   * 继续下一个待进行的测验
   */
  public continueNextPendingExercise() {
    // 获取下一个待进行的的测验
    const nextPendingExercise = this.getNextPendingExercise()

    // 如果成功获取，直接运行测验
    nextPendingExercise && nextPendingExercise.run()
  }

  /**
   * 运行指定的测试
   * @param name 测试名
   * @returns 
   */

  public async runExercise(name: string) {
    const exercise = this.getExercise(name)

    if (!exercise) {
      exitWithError(`no exercise named ${colors.underline.bold.italic(name)} has been found`);
      return;
    }

    await exercise.run()
  }
}

const exerciseManager = new ExerciseManager()

export default exerciseManager;