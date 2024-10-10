import { BaseCommand } from "./index";

interface IInitCommandOptions {
  folder: string | true | 'vuelings'
}

export default class InitCommand extends BaseCommand<IInitCommandOptions> {
  static register() {
    return new InitCommand()
  }

  constructor() {
    super(
      "init",
      [
        {
          flags: "-f, --folder [folder name]",
          description: "If folder name is configured, a folder with the corresponding name is created. Otherwise, the default folder name is vuelings",
          defaultValue: "vuelings"
        }
      ])
  }

  async handle(args: IInitCommandOptions): Promise<void> {
    const folderName =
      args.folder === true ?
        await this.requestPrompt<string>({
          type: 'text',
          name: 'folder',
          message: `What is your preferred folder name`
        })
        :
        args.folder;

    const confirmation = await this.requestPrompt<boolean>({
      type: 'confirm',
      name: "confirmation",
      message: `This command will create the directory \`${folderName}/\` which will contain the exercises. Press Y or Enter to confirm.`,
      initial: true
    })

    if (!confirmation) return;

    console.log("init..");
  }
}
