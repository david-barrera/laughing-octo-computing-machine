import { DataSource } from "typeorm";
import { IDeviceRepository } from "../../domain/repositories/device-repository";
import { DeviceModel } from "../models/device-model";
import { UnknownRepositoryError } from "../errors/unknown-repository-error";
import { Device } from "../../domain/entities/device";

export class DeviceRepositoryTypeormImpl implements IDeviceRepository {
  private readonly repository;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(DeviceModel);
  }
  async createDevice(device: DeviceModel) {
      return await this.repository.save(device);
  }

  getDeviceOrNull(id: string): Promise<Device | null> {
    return this.repository.findOneBy({ id });
  }
}
