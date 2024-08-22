import { Device } from "../../domain/entities/device";
import {
  IDeviceRepository,
  PageInput,
  PaginatedResult,
} from "../../domain/repositories/device-repository";
import { ILogger } from "../../infrastructure/interfaces/logger";

export class ListDevicesUseCase {
  constructor(
    private logger: ILogger,
    private deviceRepository: IDeviceRepository
  ) {
    this.logger.setContext(ListDevicesUseCase.name);
  }

  async execute(input: PageInput): Promise<PaginatedResult<Device>> {
    this.logger.info(`Getting all devices by page: ${input.page}, pageSize: ${input.pageSize}`);
    return await this.deviceRepository.listDevices(input);
  }
}
