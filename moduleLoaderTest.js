const ModuleLib = require("./src/modules");
const path = require("path");

let manager = new ModuleLib.ModuleManager(path.join(__dirname, "/modules"));