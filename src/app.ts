import {TableScreen, Color, Frame} from "./libs/screen";
import config from "./config.json";
import { ModuleManager } from "./libs/modules";
import path from "path";

var mainScreen = new TableScreen(config.emulator.onlyEmulate, config.screen);
mainScreen.init();

var moduleManager = new ModuleManager();
moduleManager.load(path.join(__dirname, "defaultModules"));
moduleManager.load(path.join(__dirname, "modules"));