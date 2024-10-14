import figlet from "figlet";
import colors from "colors";
import { program } from "commander";

export function greeting() {
  console.log("welcome to.")

  figlet("VUELINGS", (_, data) => {
    console.log(data);

    console.log("The vuelings exercises couldn't be found in the current directory.");
    console.log(`If you are using ${colors.italic.yellow('vuelings')} for the first time, you can try running the ${colors.italic.green('vuelings init')} command.`);
  })
}