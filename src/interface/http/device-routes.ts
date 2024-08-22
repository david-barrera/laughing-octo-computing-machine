import express from "express";
import { DeviceController } from "../../infrastructure/controllers/device-controllers";
import { IRouter } from "./router-interface";
import { createDeviceValidator } from "../../infrastructure/validators/device-validator";
import { validationMiddleware } from "./middlewares/validation-middleware";
import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware";

export class DeviceRoutes implements IRouter<express.Router> {
  private readonly path = "/devices";
  private router;
  constructor(private readonly deviceController: DeviceController) {
    this.router = express.Router();
  }
  init(): express.Router {
    this.router.post(
      this.path,
      createDeviceValidator,
      validationMiddleware,
      this.deviceController.createDevice.bind(this.deviceController),
    );
    return this.router;
  }
}
