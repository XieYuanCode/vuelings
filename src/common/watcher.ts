import fs from "node:fs"

export function startWatchFileChanged(file: string, watchListener: fs.WatchListener<string>): fs.FSWatcher {
  return fs.watch(file, watchListener)
}