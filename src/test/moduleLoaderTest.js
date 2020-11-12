const ModuleLib = require("../libs/modules");
const path = require("path");
const chalk = require("chalk");

let manager = new ModuleLib.ModuleManager();
manager.load(path.join(__dirname, "../modules"));
manager.load(path.join(__dirname, "../defaultModules"));

console.log(chalk.yellow("Menu module by folderId:"));
console.log(manager.getModuleByFolderId("menu"));