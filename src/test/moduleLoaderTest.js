const ModuleLib = require("../libs/modules");
const path = require("path");

let manager = new ModuleLib.ModuleManager([path.join(__dirname, "../modules"), path.join(__dirname, "../defaultModules")]);