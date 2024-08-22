import { GetDeviceUseCase } from "../../../src/application/use-cases/get-device-use-case";
import { Device } from "../../../src/domain/entities/device";
import { IDeviceRepository } from "../../../src/domain/repositories/device-repository";
import { DeviceNotFoundError } from "../../../src/interface/http/errors/device-not-found-error";
import { LoggerMock } from "../../mocks/logger-mock";

describe("GetDeviceUseCase", () => {
  let usecase: GetDeviceUseCase;
  let deviceRepository: IDeviceRepository;

  beforeEach(() => {
    const logger = new LoggerMock();
    deviceRepository = {
      getDeviceOrNull: jest.fn(),
    } as unknown as IDeviceRepository;
    usecase = new GetDeviceUseCase(logger, deviceRepository);
  });

  describe("execute", () => {
    it("should call deviceRepository.get with the correct parameters", async () => {
      const getSpy = jest
        .spyOn(deviceRepository, "getDeviceOrNull")
        .mockResolvedValueOnce({} as Device);

      const deviceId = "402e07f2-977e-47e1-8ecd-93311d032107";
      await usecase.execute(deviceId);
      expect(getSpy).toHaveBeenCalledWith(deviceId);
    });
    it("should throw an error if the device does not exist", async () => {
      jest.spyOn(deviceRepository, "getDeviceOrNull").mockResolvedValueOnce(null);

      const deviceId = "402e07f2-977e-47e1-8ecd-93311d032107";
      await expect(usecase.execute(deviceId)).rejects.toThrow(DeviceNotFoundError)
    });
  });
});
