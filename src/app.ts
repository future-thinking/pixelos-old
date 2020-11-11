import path from "path";
import {TableScreen, Color, Frame} from "./libs/screen";
import config from "./config.json";

var mainScreen = new TableScreen(config.emulator.onlyEmulate, config.screen);