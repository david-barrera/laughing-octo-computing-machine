import { Device } from "../entities/device";

export interface IDeviceRepository {
  createDevice(device: Device): Promise<Device>;
}
