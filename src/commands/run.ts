import { BaseCommand } from "./index.js";
import blessed from "blessed"
// import { createVitest } from "vitest/node"

export default class RunCommand extends BaseCommand<string> {
  static register() {
    return new RunCommand()
  }

  constructor() {
    super("run [name]", [], "Run a single exercise. Runs the next pending exercise if the exercise name is not specified")
  }

  async handle(args?: string) {
    console.log("args!!!", args);

    const screen = blessed.screen({
      smartCSR: true
    });
    
    // 设置屏幕标题
    screen.title = '终端应用';
    
    // 创建一个可滚动的列表区域
    const list = blessed.listtable({
      mouse: true,
      keys: true,
      vi: true,
      top: 0,
      left: 0,
      width: '100%',
      height: '80%',
      border: {
        type: 'line',
      },
      style: {
        border: {
          fg: 'cyan'
        },
        header: {
          fg: 'white',
          bg: 'blue',
          bold: true
        },
        cell: {
          fg: 'white',
          bg: 'black'
        }
      }
    });
    
    // 示例数据
    const data = [
      ['Name', 'Age', 'City'],
      ['Alice', '30', 'New York'],
      ['Bob', '25', 'San Francisco'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
      ['Charlie', '35', 'Los Angeles'],
    ];
    
    // 将数据填充到列表中
    list.setData(data);
    
    // 创建底部提示区域
    const hint = blessed.box({
      top: '80%',
      left: 0,
      width: '100%',
      height: 'shrink',
      content: 'h:hint / l:list / q:quit',
      align: 'center',
      valign: 'middle',
    });
    
    // 将列表和提示区域添加到屏幕
    screen.append(list);
    screen.append(hint);

    // 监听键盘事件
    list.on('select', (item) => {
      // 可以在这里处理选择事件
      const selected = item.getText();
      console.log(`你选择了: ${selected}`);
    });

    // 处理退出
    screen.key(['escape', 'q', 'C-c'], (ch, key) => {
      return process.exit(0);
    });
    
    // 渲染屏幕
    screen.render();

    // const vitest = await createVitest('test', {
    //   watch: false
    // })

    // vitest.start()
    //   .then(() => {
    //     console.log(vitest.state.getFiles());
    //   })

    // const collection = await vitest.collect()



    // collection.tests.forEach(test => {
    //   console.log(test);
    // })

    // const vitest = await createVitest('test', {
    //   watch: true
    // })

    // console.log(vitest);
  }
}