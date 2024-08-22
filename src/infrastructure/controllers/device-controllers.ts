import { Request, Response, NextFunction } from "express";
import { CreateDeviceUseCase } from "../../application/use-cases/create-device-use-case";
import { BaseController } from "./base-controller";
import { GetDeviceUseCase } from "../../application/use-cases/get-device-use-case";

export class DeviceController extends BaseController {
  constructor(
    private readonly createDeviceUseCase: CreateDeviceUseCase,
    private readonly getDeviceUseCase: GetDeviceUseCase
  ) {
    super();
  }

  async createDevice(req: Request, res: Response) {
    const result = await this.createDeviceUseCase.execute({
      name: req.body.name,
      brand: req.body.brand,
    });
    res.status(201).json(result);
  }

  async getDevice(req: Request, res: Response) {
    const result = await this.getDeviceUseCase.execute(req.params.id);
    res.status(200).json(result);
  }
}
