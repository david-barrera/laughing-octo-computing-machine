import { Device } from "../../domain/entities/device";

export class DeviceModel implements Device {
  public id!: string;
  public name!: string;
  public brand!: string;
  public createdAt!: Date;
}
