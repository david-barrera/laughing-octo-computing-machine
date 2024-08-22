import { Device } from "../../domain/entities/device";
import { IDeviceRepository } from "../../domain/repositories/device-repository";
import { ILogger } from "../../infrastructure/interfaces/logger";
import { DeviceNotFoundError } from "../../interface/http/errors/device-not-found-error";

export class GetDeviceUseCase {
  constructor(
    private logger: ILogger,
    private deviceRepository: IDeviceRepository
  ) {
    this.logger.setContext(GetDeviceUseCase.name);
  }

  async execute(id: string): Promise<Device> {
    this.logger.info(`Getting device with id ${id}`);
      const device = await this.deviceRepository.getDeviceOrNull(id);
      if (device) {
        return device;
      }
      throw new DeviceNotFoundError();
  }
}
