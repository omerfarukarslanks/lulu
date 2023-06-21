import * as process from "process";
import * as fs from "fs";
import { join } from "path";
import {ServiceConfiguration} from "@translations-config/model";
export const loadConfigJson = (message = "[LOAD] config.json file"): ServiceConfiguration => {
  let config: any = process.env["config"];
  if (!config) {
    console.log(`${message}:`, `${__dirname}/assets/config.json`);
    const jsonFile = fs.readFileSync(join(__dirname, "assets", "config.json"), "utf8");
    process.env["config"] = jsonFile;
    config = JSON.parse(jsonFile);
  } else {
    config = JSON.parse(process.env["config"] as any);
  }
  return config;
};
