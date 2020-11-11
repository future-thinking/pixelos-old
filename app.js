const config = require("./config.json");

const ScreenLib = require("./src/screen");

var mainScreen = new ScreenLib.Screen(false, config.screen);