import { BaseHttpError } from "./base-http-error";

export class DeviceNotFoundError extends BaseHttpError {
  constructor() {
    super("Device not found", 404);
  }
}
