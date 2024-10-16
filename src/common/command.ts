import { BaseCommand } from "../commands/index.js";

/**
 * 注册所有命令
 * @param commands 
 * @param cwd 
 */
export function registerCommands(commands: Array<typeof BaseCommand<unknown>>, cwd: string) {
  commands.forEach(c => c.register(cwd))
}