const ScreenLib = require("../libs/screen");
const chalk = require("chalk");

let testFrame = new ScreenLib.Frame(4);

testFrame.setPixel(0, 1, new ScreenLib.Color(255, 255, 255));
testFrame.setPixel(1, 0, new ScreenLib.Color(255, 255, 255));
testFrame.setPixel(2, 3, new ScreenLib.Color(255, 255, 255));
testFrame.setPixel(3, 0, new ScreenLib.Color(255, 255, 255));
testFrame.setPixel(0, 0, new ScreenLib.Color(255, 0, 0));
testFrame.setPixel(1, 3, new ScreenLib.Color(0, 255, 0));
testFrame.setPixel(2, 1, new ScreenLib.Color(0, 0, 255));

console.log(chalk.yellow("Normal 4x4 test Frame"));
console.log(testFrame.toConsoleOutput());

console.log(chalk.yellow("Rotated 4x4 test Frame"));
testFrame.rotate90deg();
console.log(testFrame.toConsoleOutput());

console.log(chalk.yellow("3 times rotated 4x4 test Frame"));
testFrame.rotate(2);
console.log(testFrame.toConsoleOutput());
