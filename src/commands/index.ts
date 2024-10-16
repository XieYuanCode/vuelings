import { Command, program } from "commander"
import prompts from "prompts"
const { prompt } = prompts;

interface PromptOption {
  type: string,
  name: string,
  message: string,
  initial?: any
}

export interface ICommandOption {
  flags: string,
  description?: string,
  defaultValue?: string | boolean | string[]
}

/**
 * 命令的基类
 */
export abstract class BaseCommand<T = void> {
  static register(cwd: string) { }

  protected command?: Command

  private readonly commandName?: string

  constructor(
    protected readonly cwd: string = process.cwd(),
    commandName?: string,
    public options: ICommandOption[] = [],
    public description?: string,
  ) {
    if (commandName) {
      this.commandName = commandName;

      this.command = program.command(this.commandName)

      this.options.forEach(option => {
        this.command!.option(option.flags, option.description, option.defaultValue)
      })

      description && this.command.description(description)
      this.command.action(this.handle.bind(this))
    } else {
      // default action without command name
      program.action(this.handle.bind(this))
    }
  }

  /**
   * 继承此类必须实现的方法
   * 命令的主要功能实现
   * @param args 
   */
  abstract handle(args?: T): void

  /**
   * 提供一个 cli 交互的 api 共子类调用
   * @param options 
   * @returns 
   */
  public async requestPrompt<T>(options: PromptOption): Promise<T> {
    return (await prompt(options))[options.name]
  }
}
