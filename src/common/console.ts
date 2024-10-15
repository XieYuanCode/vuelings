import colors from "colors"
import figlet from "figlet";

export function exitWithError(errorMessage: string) {
  console.error(`❗️ ${colors.red(errorMessage)}`)
}

export function printSuccessLog(success: string) {
  console.log(`🎉 ${colors.green(success)}`)
}

export function printHintOnFailed() {
  console.log(`${colors.gray(`press ${colors.white('h')} to show help, press ${colors.white('l')} to list all exercises, press ${colors.white('q')} to quit.`)}`);
}

export function greeting() {
  console.log("welcome to.")

  figlet("VUELINGS", (_, data) => {
    console.log(data);

    console.log("The vuelings exercises couldn't be found in the current directory.");
    console.log(`If you are using ${colors.italic.yellow('vuelings')} for the first time, you can try running the ${colors.italic.green('vuelings init')} command.`);
  })
}