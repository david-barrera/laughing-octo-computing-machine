import * as log4js from "log4js";
import { ILogger } from "../interfaces/logger";

export class Log4JsLogger implements ILogger {
  private logger: log4js.Logger;

  constructor() {
    log4js.configure({
      appenders: { console: { type: "console" } },
      categories: { default: { appenders: ["console"], level: "debug" }}
    });

    this.logger = log4js.getLogger();
  }

  info(message: string): void {
    this.logger.info(message);
  }
  error(message: string): void {
    this.logger.error(message);
  }

  setContext(context: string): void {
    this.logger = log4js.getLogger(context);
  }
}
