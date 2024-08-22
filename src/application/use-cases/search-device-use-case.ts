import { Device } from "../../domain/entities/device";
import {
  IDeviceRepository,
  PageInput,
  PaginatedResult,
} from "../../domain/repositories/device-repository";
import { ILogger } from "../../infrastructure/interfaces/logger";

export interface SearchDeviceUseCaseInput {
  brand: string;
}

export class SearchDeviceUseCase {
  constructor(
    private logger: ILogger,
    private deviceRepository: IDeviceRepository
  ) {
    this.logger.setContext(SearchDeviceUseCase.name);
  }

  async execute(
    input: SearchDeviceUseCaseInput,
    pageInput: PageInput
  ): Promise<PaginatedResult<Device>> {
    this.logger.info(
      `Searching devices. Page: ${pageInput.page}, pageSize: ${pageInput.pageSize}, brand: ${input.brand}`
    );
    return await this.deviceRepository.searchDevice(input, pageInput);
  }
}
