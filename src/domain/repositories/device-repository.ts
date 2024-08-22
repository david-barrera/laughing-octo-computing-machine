import { Device } from "../entities/device";

export interface CreateDeviceInput {
  name: string;
  brand: string;
}

export interface IDeviceRepository {
  createDevice(input: CreateDeviceInput): Promise<Device>;
  getDeviceOrNull(id: string): Promise<Device | null>;
}
