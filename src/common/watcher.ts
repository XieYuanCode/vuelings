// 主要负责监听文件变化
// 现阶段尚未投入使用，vitest 自带 watch 功能
import fs from "node:fs"

export function startWatchFileChanged(file: string, watchListener: fs.WatchListener<string>): fs.FSWatcher {
  return fs.watch(file, watchListener)
}