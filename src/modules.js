const fs = require("fs");
const path = require("path");
const chalk = require('chalk');

class Module {
    path;
    
}

class ModuleManager {
    modules;

    constructor(pathToModules) {
        fs.readdirSync(pathToModules).forEach((file) => {
            if (fs.lstatSync(path.join(pathToModules, file)).isDirectory()) {
                if (fs.existsSync(path.join(pathToModules, file, "package.json"))) {
                    let module = new Module();
                    modules.push(module);
                } else {
                    console.log(chalk.red("Module " + chalk.blue(file) + 
                    " has no " + chalk.underline("package.json") + ". It will not be loaded."));
                }
            }
        });
    }
}

module.exports = {
    Module: Module,
    ModuleManager: ModuleManager,
}