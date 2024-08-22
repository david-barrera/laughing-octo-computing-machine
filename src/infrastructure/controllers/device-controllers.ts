import { Request, Response } from "express";
import { CreateDeviceUseCase } from "../../application/use-cases/create-device-use-case";


export class DeviceController {
  constructor(private readonly createDeviceUseCase: CreateDeviceUseCase) {}

  async createDevice(req: Request, res: Response) {
    const result = await this.createDeviceUseCase.execute(req.body);
    res.status(201).json(result);
  }
}
