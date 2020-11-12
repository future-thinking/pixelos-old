import fs from "fs";
import path from "path";
import chalk from "chalk";
import { config } from "process";
import { SrvRecord } from "dns";

export class Module {
  path: string;
  jsonConfig: any;
  constructor(path: string, jsonConfig: any) {
    this.path = path;
    this.jsonConfig = jsonConfig;
  }
}

export class ModuleManager {
  modules: Array<Module>;

  constructor() {
    this.modules = [];
  }

  load(pathToModules: string): void {
    if (fs.existsSync(pathToModules)) {
      fs.readdirSync(pathToModules).forEach((file) => {
        if (fs.lstatSync(path.join(pathToModules, file)).isDirectory()) {
          if (fs.existsSync(path.join(pathToModules, file, "module.json"))) {
            let jsonConfig = require(path.join(
              pathToModules,
              file,
              "module.json"
            ));
            let module = new Module(path.join(pathToModules, file), jsonConfig);
            this.modules.push(module);
          } else {
            console.log(
              chalk.red(
                "Module " +
                  chalk.blue(file) +
                  " has no " +
                  chalk.underline("module.json") +
                  ". It will not be loaded."
              )
            );
          }
        }
      });
    }
  }
}
