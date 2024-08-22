import { Request, Response, NextFunction } from "express";
import { CreateDeviceUseCase } from "../../application/use-cases/create-device-use-case";
import { BaseController } from "./base-controller";

export class DeviceController extends BaseController{
  constructor(private readonly createDeviceUseCase: CreateDeviceUseCase) {
    super();
  }

 async createDevice(req: Request, res: Response) {
    const result = await this.createDeviceUseCase.execute({
      name: req.body.name,
      brand: req.body.brand,
    });
    res.status(201).json(result);
  }
}
