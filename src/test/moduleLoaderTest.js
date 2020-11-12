const ModuleLib = require("../libs/modules");
const path = require("path");

let manager = new ModuleLib.ModuleManager();
manager.load(path.join(__dirname, "../modules"));
manager.load(path.join(__dirname, "../defaultModules"));