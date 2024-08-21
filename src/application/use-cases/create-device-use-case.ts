import { Device } from "../../domain/entities/device";
import { IDeviceRepository } from "../../domain/repositories/device-repository";

export class CreateDeviceUseCase {
  constructor(private deviceRepository: IDeviceRepository) {}

  async execute(device: Device): Promise<Device> {
    return this.deviceRepository.createDevice(device);
  }
}
