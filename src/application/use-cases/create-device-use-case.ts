import { Device } from "../../domain/entities/device";
import { IDeviceRepository } from "../../domain/repositories/device-repository";

export interface CreateDeviceUseCaseInput{
  name: string;
  brand: string;
}

export class CreateDeviceUseCase {
  constructor(private deviceRepository: IDeviceRepository) {}

  async execute(input: CreateDeviceUseCaseInput): Promise<Device> {
    return this.deviceRepository.createDevice(input);
  }
}
