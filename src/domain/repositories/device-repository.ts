import { Device } from "../entities/device";

export interface CreateDeviceInput {
  name: string;
  brand: string;
}

export interface UpdateDeviceInput {
  name?: string;
  brand?: string;
}
export interface PageInput {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
}

export interface IDeviceRepository {
  createDevice(input: CreateDeviceInput): Promise<Device>;
  getDeviceOrNull(id: string): Promise<Device | null>;
  listDevices(input: PageInput): Promise<PaginatedResult<Device>>;
  updateDevice(id: string, input: UpdateDeviceInput): Promise<Device | null>;
}
