import express from "express";
import { DeviceController } from "../../infrastructure/controllers/device-controllers";
import { IRouter } from "./router-interface";
import { createDeviceValidator, getDeviceValidator } from "../../infrastructure/validators/device-validator";
import { validationMiddleware } from "./middlewares/validation-middleware";
import { paginationInputValidator } from "../../infrastructure/validators/pagination-validator";

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

    this.router.get(
      `${this.path}/:id`,
      getDeviceValidator,
      validationMiddleware,
      this.deviceController.getDevice.bind(this.deviceController),
    );

    this.router.get(
      this.path,
      paginationInputValidator,
      validationMiddleware,
      this.deviceController.listDevices.bind(this.deviceController),
    );
    return this.router;
  }
}
