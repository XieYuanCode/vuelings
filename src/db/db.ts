import { JSONFilePreset } from "lowdb/node";
import type { Low } from "lowdb"
import path from "node:path"

interface IJsonDbModal {
  passed: string[],
}

const defaultValue: IJsonDbModal = {
  passed: []
}

let db: Low<IJsonDbModal> | undefined;

const DB_FILE_NAME = "vuelings.jsonc"

export async function initJsonData() {
  const dbPath = path.join(process.cwd(), DB_FILE_NAME)
  db = await JSONFilePreset<IJsonDbModal>(dbPath, defaultValue)
}

export async function updatePassedExercises(exercises: string[]) {
  if (!db) return;
  db.data.passed = exercises;
  return await db.write()
}

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

export function getPassed() {
  if (!db) return;
  
  return db.data.passed
}
