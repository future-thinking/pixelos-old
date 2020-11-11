import path from "path";

const config = require(path.join(__dirname, "./config.json"));

import {TableScreen, Color, Frame} from "./libs/screen";

var mainScreen = new TableScreen(false, config.screen);