import express from "express";
import { DeviceController } from "../../infrastructure/controllers/device-controllers";
import { IRouter } from "./router-interface";

export class DeviceRoutes implements IRouter<express.Router> {
  private router;
  constructor(private readonly deviceController: DeviceController) {
    this.router = express.Router();
  }
  init(): express.Router {
    this.router.post("/device", this.deviceController.createDevice.bind(this.deviceController));
    return this.router;
  }
}
