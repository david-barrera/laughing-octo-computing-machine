import { DataSource, FindOperator, FindOptionsWhere, ILike } from "typeorm";
import {
  IDeviceRepository,
  PageInput,
  PaginatedResult,
} from "../../domain/repositories/device-repository";
import { DeviceModel } from "../models/device-model";
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

  async listDevices(input: PageInput): Promise<PaginatedResult<Device>> {
    const [items, total] = await this.repository.findAndCount({
      skip: (input.page - 1) * input.pageSize,
      take: input.pageSize,
      order: { createdAt: "ASC" },
    });
    return {
      items: [...items],
      totalItems: total,
    };
  }

  async updateDevice(
    id: string,
    device: Partial<Device>
  ): Promise<Device | null> {
    const existingDevice = await this.repository.findOneBy({
      id,
    });
    if (!existingDevice) {
      return null;
    }
    const deviceToUpdate = { ...existingDevice, ...device };
    await this.repository.update(id, deviceToUpdate);
    return this.repository.findOneBy({ id });
  }

  async deleteDevice(id: string): Promise<{ success: boolean }> {
    const result = await this.repository.delete(id);
    return { success: result.affected === 1 };
  }

  async searchDevice(
    input: { brand: string },
    pageInput: PageInput
  ): Promise<PaginatedResult<Device>> {
    const whereClause = {} as FindOptionsWhere<DeviceModel>;
    if (input.brand) {
      whereClause.brand = ILike(`%${input.brand}%`);
    }

    const [items, total] = await this.repository.findAndCount({
      where: whereClause,
      skip: (pageInput.page - 1) * pageInput.pageSize,
      take: pageInput.pageSize,
      order: { createdAt: "DESC" },
    });
    return {
      items: [...items],
      totalItems: total,
    };
  }
}
