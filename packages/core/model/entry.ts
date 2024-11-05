import "reflect-metadata"
/**
 * @interface IEntry 入口
 * @description 主要负责定义程序入口事件
 */
export interface IEntry {
  onInitialize?: () => void
  onInitialized?: () => void
}