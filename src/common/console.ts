// 输出工具函数集合
import colors from "colors"
import figlet from "figlet";

/**
 * 输出错误信息
 * @param errorMessage 
 */
export function exitWithError(errorMessage: string) {
  console.error(`❗️ ${colors.red(errorMessage)}`)
}

/**
 * 输出成功信息
 * @param success 
 */
export function printSuccessLog(success: string) {
  console.log(`🎉 ${colors.green(success)}`)
}

/**
 * 验证失败时的 hint
 */
export function printHintOnFailed() {
  console.log(`${colors.gray(`press ${colors.white('h')} to show help, press ${colors.white('l')} to list all exercises, press ${colors.white('q')} to quit.`)}`);
}

/**
 * 欢迎
 */
export function greeting() {
  console.log("welcome to.")

  figlet("VUELINGS", (_, data) => {
    console.log(data);

    console.log("The vuelings exercises couldn't be found in the current directory.");
    console.log(`If you are using ${colors.italic.yellow('vuelings')} for the first time, you can try running the ${colors.italic.green('vuelings init')} command.`);
  })
}