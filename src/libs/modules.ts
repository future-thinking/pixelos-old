import fs from "fs";
import path from "path";
import chalk from "chalk";
import { config } from "process";
import { SrvRecord } from "dns";
import { strict } from "assert";

export class Module {
  path: string;
  jsonConfig: any;
  folderId: string;

  constructor(path: string, jsonConfig: any, folderId: string) {
    this.folderId = folderId;
    this.path = path;
    this.jsonConfig = jsonConfig;
  }
}

export class ModuleManager {
  modules: Array<Module>;

  runningModule: Module | null;

  constructor() {
    this.modules = [];
    this.runningModule = null;
  }

  getModuleByFolderId(folderId: string): Module | null {
    for (let module of this.modules) {
      if (module.folderId == folderId)
        return module;
    }

    return null;
  }

  startModule(module: string | Module): void {
    if (typeof module == "string") {

    }
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
            let module = new Module(
              path.join(pathToModules, file),
              jsonConfig,
              file
            );
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
