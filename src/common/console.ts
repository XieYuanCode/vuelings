import colors from "colors"

export function exitWithError(errorMessage: string) {
  console.error(`❗️ ${colors.red(errorMessage)}`)
}

export function printSuccessLog(success: string) {
  console.log(`🎉 ${colors.green(success)}`)
}