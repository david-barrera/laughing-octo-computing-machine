import { Device } from "../../domain/entities/device";
import { IDeviceRepository } from "../../domain/repositories/device-repository";
import { ILogger } from "../../infrastructure/interfaces/logger";

export interface CreateDeviceUseCaseInput {
  name: string;
  brand: string;
}

export class CreateDeviceUseCase {
  constructor(
    private logger: ILogger,
    private deviceRepository: IDeviceRepository
  ) {
    this.logger.setContext(CreateDeviceUseCase.name);
  }

  async execute(input: CreateDeviceUseCaseInput): Promise<Device> {
    this.logger.info("Creating device");
    return await this.deviceRepository.createDevice(input);
  }
}
