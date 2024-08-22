import { IDeviceRepository } from "../../domain/repositories/device-repository";
import { ILogger } from "../../infrastructure/interfaces/logger";

export class DeleteDeviceUseCase {
  constructor(
    private logger: ILogger,
    private deviceRepository: IDeviceRepository
  ) {
    this.logger.setContext(DeleteDeviceUseCase.name);
  }

  async execute(id: string): Promise<{ success: boolean }> {
    this.logger.info(`Deleting device with id ${id}`);
    return await this.deviceRepository.deleteDevice(id);
  }
}
