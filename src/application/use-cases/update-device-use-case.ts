import { Device } from "../../domain/entities/device";
import { IDeviceRepository } from "../../domain/repositories/device-repository";
import { ILogger } from "../../infrastructure/interfaces/logger";
import { DeviceNotFoundError } from "../../interface/http/errors/device-not-found-error";

export interface UpdateDeviceUseCaseInput {
  id: string;
  name?: string;
  brand?: string;
}

export class UpdateDeviceUseCase {
  constructor(
    private logger: ILogger,
    private deviceRepository: IDeviceRepository
  ) {
    this.logger.setContext(UpdateDeviceUseCase.name);
  }

  async execute({id,name,brand}: UpdateDeviceUseCaseInput): Promise<Device> {
    this.logger.info("Creating device");
    const device = await this.deviceRepository.updateDevice(id, {name, brand});
    if (device) {
      return device;
    }
    throw new DeviceNotFoundError();
  }
}
