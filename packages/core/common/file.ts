// 文件工具函数集合
import fs from "node:fs";
import path from "node:path"
import { glob } from "glob"

/**
 * 是否是一个合格的测试目录、
 * 验证条件是判断时候包含一个.vuelings的文件
 * @param folder 
 * @returns 
 */
export function hasDotVuelingsFile(folder: string) {
  const fileName = path.join(folder, ".vuelings")
  return fs.existsSync(fileName)
}

/**
 * 获取目录中的测试存放目录
 * @param folder 
 * @returns 
 */
export function getExercisesFolder(folder: string): string | undefined {
  const exercisesFolder = path.join(folder, "/exercises")

  if (fs.existsSync(exercisesFolder)) {
    return exercisesFolder
  }
}

/**
 * 跟据一个 vue 文件获取对应的单元测试文件
 * @param vueFile 
 * @returns 
 */
export function getTestFileFromVueFile(vueFile: string): string | undefined {
  const testFilePath = path.join(path.dirname(vueFile), `${path.basename(vueFile, '.vue')}.test.ts`)

  if (fs.existsSync(testFilePath)) {
    return testFilePath
  }
}

/**
 * 获取目录下所有的符合要求的 vue 文件（测试源文件）
 * @param exercisesFolder 
 * @returns 
 */
export async function getExercisesSourceFiles(exercisesFolder: string) {
  return (await glob("**/*.vue", { cwd: exercisesFolder, absolute: true }))
    .filter(vueFile => {
      return !!getTestFileFromVueFile(vueFile)
    })
    .reverse()
}