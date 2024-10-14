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
  public init(cwd: string) {
    const exercisesFolder = getExercisesFolder(cwd)

    if (!exercisesFolder) {
      exitWithError(`No exercises folders has been found in ${cwd}, please rerun ${colors.italic('vuelings init')} command`)
      return;
    }

    const exerciseSourceFiles = getExercisesSourceFiles(exercisesFolder);

    this._exercises = exerciseSourceFiles.map(eSF => Exercise.fromSourceFile(eSF));
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

  public runExercise(name: string) {
    const exercise = this.getExercise(name)

    if (!exercise) {
      exitWithError(`no exercise named ${colors.underline.bold.italic(name)} has been found`);
      return;
    }

    exercise.run()
  }
}

const exerciseManager = new ExerciseManager()

export default exerciseManager;