import { UpdateDeviceUseCase, UpdateDeviceUseCaseInput } from "../../../src/application/use-cases/update-device-use-case";
import { Device } from "../../../src/domain/entities/device";
import { IDeviceRepository } from "../../../src/domain/repositories/device-repository";
import { DeviceNotFoundError } from "../../../src/interface/http/errors/device-not-found-error";
import { LoggerMock } from "../../mocks/logger-mock";

describe("UpdateDeviceUseCase", () => {
  let usecase: UpdateDeviceUseCase;
  let deviceRepository: IDeviceRepository;

  beforeEach(() => {
    const logger = new LoggerMock();
    deviceRepository = {
      updateDevice: jest.fn(),
    } as unknown as IDeviceRepository;
    usecase = new UpdateDeviceUseCase(logger, deviceRepository);
  });

  describe("execute", () => {
    it("should call deviceRepository.updateDevice with the correct parameters", async () => {
      const getSpy = jest
        .spyOn(deviceRepository, "updateDevice")
        .mockResolvedValueOnce({} as Device);

      const deviceId = "402e07f2-977e-47e1-8ecd-93311d032107";
      await usecase.execute( {
        id: deviceId,
        name: "Device name",
        brand: "Brand name",
      } as UpdateDeviceUseCaseInput);
      expect(getSpy).toHaveBeenCalledWith(deviceId,{
        name: "Device name",
        brand: "Brand name",
      });
    });
    it("should throw an error if the device does not exist", async () => {
      jest.spyOn(deviceRepository, "updateDevice").mockResolvedValueOnce(null);

      const deviceId = "402e07f2-977e-47e1-8ecd-93311d032107";
      await expect(usecase.execute({
        id: deviceId,
        name: "Device name",
        brand: "Brand name",
      })).rejects.toThrow(
        DeviceNotFoundError
      );
    });
  });
});
