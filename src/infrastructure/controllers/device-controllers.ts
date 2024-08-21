import { CreateDeviceUseCase } from "../../application/use-cases/create-device-use-case";
import { Device } from "../../domain/entities/device";

export class DeviceController {
  constructor(private readonly createDeviceUseCase: CreateDeviceUseCase) {}

  async createDevice(device: Device): Promise<Device> {
    return this.createDeviceUseCase.execute(device);
  }
}
