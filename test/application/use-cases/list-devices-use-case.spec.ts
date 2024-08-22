import { ListDevicesUseCase } from "../../../src/application/use-cases/list-devices-use-case";
import { Device } from "../../../src/domain/entities/device";
import { IDeviceRepository } from "../../../src/domain/repositories/device-repository";
import { DeviceNotFoundError } from "../../../src/interface/http/errors/device-not-found-error";
import { LoggerMock } from "../../mocks/logger-mock";

describe("ListDevicesUseCase", () => {
  let usecase: ListDevicesUseCase;
  let deviceRepository: IDeviceRepository;

  beforeEach(() => {
    const logger = new LoggerMock();
    deviceRepository = {
      listDevices: jest.fn(),
    } as unknown as IDeviceRepository;
    usecase = new ListDevicesUseCase(logger, deviceRepository);
  });

  describe("execute", () => {
    it("should call deviceRepository.get with the correct parameters", async () => {
      const deviceId = "402e07f2-977e-47e1-8ecd-93311d032107";
      const device = {
        id: deviceId,
        name: "Device name",
        brand: "Brand name",
      } as Device;
      const getSpy = jest
        .spyOn(deviceRepository, "listDevices")
        .mockResolvedValueOnce({ items: [device], totalItems: 1 });

      await usecase.execute({ page: 1, pageSize: 10 });
      expect(getSpy).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    });
  });
});
