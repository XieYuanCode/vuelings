import "reflect-metadata"
import { Entry } from "../decorator/factory"
/**
 * @interface IEntry 入口
 * @description 主要负责定义程序入口事件
 */
export interface IEntry {
  onInitialize?: () => void
  onInitialized?: () => void
}


// cli
@Entry()
class CliEntry implements IEntry {
  onInitialize() {

  }
}
