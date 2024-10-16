// 主要负责数据持久化
import { JSONFilePreset } from "lowdb/node";
import type { Low } from "lowdb"
import path from "node:path"
/**
 * 数据模型
 */
interface IJsonDbModal {
  passed: string[],
}

/**
 * 默认值
 */
const defaultValue: IJsonDbModal = {
  passed: []
}

let db: Low<IJsonDbModal> | undefined;

const DB_FILE_NAME = "vuelings.jsonc"

/**
 * 初始化
 */
export async function initJsonData() {
  const dbPath = path.join(process.cwd(), DB_FILE_NAME)
  db = await JSONFilePreset<IJsonDbModal>(dbPath, defaultValue)
}

/**
 * 更新通过的验测
 * @param exercises 通过的测验集合
 * @returns 
 */
export async function updatePassedExercises(exercises: string[]) {
  if (!db) return;
  db.data.passed = exercises;
  return await db.write()
}

/**
 * 更新单个测验的是否通过
 * @param exercise 测验名
 * @param pass 是否通过
 * @returns 
 */
export async function updatePassedExercise(exercise: string, pass: boolean = true) {
  if (!db) return;

  if (pass) {
    if (db.data.passed.includes(exercise)) { return }
    db.data.passed.push(exercise)
  } else {
    if (!db.data.passed.includes(exercise)) { return }
    db.data.passed = db.data.passed.filter(pe => pe !== exercise);
  }
  return await db.write()
}

/**
 * 获取所有通过的测验集合
 * @returns 
 */
export function getPassed() {
  if (!db) return;
  
  return db.data.passed
}
