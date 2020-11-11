const ScreenLib = require("../dist/libs/screen");
const chalk = require("chalk");

let testFrame = new ScreenLib.Frame(2, 4);

testFrame.setPixel(0, 1, new ScreenLib.Color(255, 255, 255));
testFrame.setPixel(1, 0, new ScreenLib.Color(255, 255, 255));
testFrame.setPixel(2, 1, new ScreenLib.Color(255, 255, 255));
testFrame.setPixel(3, 0, new ScreenLib.Color(255, 255, 255));
testFrame.setPixel(0, 0, new ScreenLib.Color(255, 0, 0));
testFrame.setPixel(1, 1, new ScreenLib.Color(0, 255, 0));
testFrame.setPixel(2, 1, new ScreenLib.Color(0, 0, 255));

console.log(chalk.yellow("Normal 2x4 empty Frame"));
console.log(testFrame.toConsoleOutput());

console.log(chalk.yellow("RowColumn inversed 2x4 empty Frame"));
console.log(ScreenLib.Frame.convertRowColumn(testFrame).toConsoleOutput());

console.log(chalk.yellow("Default Snake"));
let output = "";

let defaultSnake = testFrame.getPixelSnake(0, true);
defaultSnake.forEach(pixel => {
    console.log(pixel);
});

testFrame.getPixelSnake(0, true).forEach(pixel => {
    output += chalk.rgb(pixel.getR(), pixel.getG(), pixel.getB())("██ ");
});
console.log(output);
