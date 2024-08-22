import { Request, Response, NextFunction } from "express";
import { CreateDeviceUseCase } from "../../application/use-cases/create-device-use-case";
import { BaseController } from "./base-controller";
import { GetDeviceUseCase } from "../../application/use-cases/get-device-use-case";
import { ListDevicesUseCase } from "../../application/use-cases/list-devices-use-case";

export class DeviceController extends BaseController {
  constructor(
    private readonly createDeviceUseCase: CreateDeviceUseCase,
    private readonly getDeviceUseCase: GetDeviceUseCase,
    private readonly listDevicesUseCase: ListDevicesUseCase
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

  async listDevices(req: Request, res: Response) {
    const paginationInput = {
      page: parseInt(req.query.page as string) || 1,
      pageSize: parseInt(req.query.limit as string) || 10,
    };
    const result = await this.listDevicesUseCase.execute(paginationInput);
    res.status(200).json(result);
  }
}
