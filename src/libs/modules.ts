import fs from "fs";
import path from "path";
import chalk from "chalk";

export class Module {
}

export class ModuleManager {
    modules: Array<Module>;

    constructor(pathsToModules: Array<string>) {
        this.modules = [];

        pathsToModules.forEach(pathToModules => {
            fs.readdirSync(pathToModules).forEach((file) => {
                if (fs.lstatSync(path.join(pathToModules, file)).isDirectory()) {
                    if (fs.existsSync(path.join(pathToModules, file, "package.json"))) {
                        let module = new Module();
                        this.modules.push(module);
                    } else {
                        console.log(chalk.red("Module " + chalk.blue(file) + 
                        " has no " + chalk.underline("package.json") + ". It will not be loaded."));
                    }
                }
            });
        });
        
    }
}
