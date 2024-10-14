import fs from "node:fs";
import path from "node:path"
import { globSync } from "glob"

export function hasDotVuelingsFile(folder: string) {
  const fileName = path.join(folder, ".vuelings")
  return fs.existsSync(fileName)
}

export function getExercisesFolder(folder: string): string | undefined {
  const exercisesFolder = path.join(folder, "/exercises")

  if (fs.existsSync(exercisesFolder)) {
    return exercisesFolder
  }
}

export function getTestFileFromVueFile(vueFile: string): string | undefined {
  const testFilePath = path.join(path.dirname(vueFile), `${path.basename(vueFile, '.vue')}.test.ts`)

  if (fs.existsSync(testFilePath)) {
    return testFilePath
  }
}

export function getExercisesSourceFiles(exercisesFolder: string) {
  return globSync("**/*.vue", { cwd: exercisesFolder, absolute: true })
    .filter(vueFile => {
      return !!getTestFileFromVueFile(vueFile)
    })
    .reverse()
}