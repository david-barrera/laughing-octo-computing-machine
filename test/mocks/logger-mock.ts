import { ILogger } from "../../src/infrastructure/interfaces/logger";

export class LoggerMock implements ILogger {
  setContext() {}
  info() {}
  error() {}
}
