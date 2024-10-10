import { Command, program } from "commander"
import { prompt } from "prompts"


interface PromptOption {
  type: string ,
  name: string,
  message: string,
  initial?: any
}

export interface ICommandOption {
  flags: string,
  description?: string,
  defaultValue?: string | boolean | string[]
}


export abstract class BaseCommand<T = void> {
  protected command: Command

  constructor(
    public readonly commandName: string,
    public options: ICommandOption[] = [],
    public description?: string
  ) {
    this.command = program.command(this.commandName)

    this.options.forEach(option => {
      this.command.option(option.flags, option.description, option.defaultValue)
    })

    description && this.command.description(description)
    this.command.action(this.handle.bind(this))
  }

  abstract handle(args?: T): void

  public async requestPrompt<T>(options: PromptOption) :Promise<T> {
    return (await prompt(options))[options.name]
  }
}
