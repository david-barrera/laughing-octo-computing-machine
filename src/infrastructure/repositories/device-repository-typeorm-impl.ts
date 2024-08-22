import { DataSource } from "typeorm";
import { IDeviceRepository } from "../../domain/repositories/device-repository";
import { DeviceModel } from "../models/device-model";
import { UnknownRepositoryError } from "../errors/unknown-repository-error";

export class DeviceRepositoryTypeormImpl implements IDeviceRepository {
  private readonly repository;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(DeviceModel);
  }
  async createDevice(device: DeviceModel) {
    try {
      return await this.repository.save(device);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnknownRepositoryError(DeviceRepositoryTypeormImpl.name, e);
      }
      throw e;
    }
  }
}
