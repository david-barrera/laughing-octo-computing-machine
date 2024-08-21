import { DataSource } from "typeorm";
import { IDeviceRepository } from "../../domain/repositories/device-repository";
import { DeviceModel } from "../models/device-model";

export class DeviceRepositoryTypeormImpl implements IDeviceRepository {
  private readonly repository;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(DeviceModel);
  }
  async createDevice(device: DeviceModel) {
    return this.repository.save(device);
  }
}
