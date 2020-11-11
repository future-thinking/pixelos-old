const ScreenLib = require("../src/screen");
const chalk = require("chalk");

let testFrame = new ScreenLib.Frame(2, 4);

console.log(chalk.yellow("Normal 2x4 empty Frame"));
console.log(testFrame.getGrid());

console.log(chalk.yellow("RowColumn inversed 2x4 empty Frame"));
console.log(testFrame.convertRowColumn());
