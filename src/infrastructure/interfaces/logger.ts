export interface ILogger {
  setContext(context: string): void;
  info(message: string): void;
  error(message: string, error?: Error): void;
}
