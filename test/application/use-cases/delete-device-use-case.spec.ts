import { DeleteDeviceUseCase } from "../../../src/application/use-cases/delete-device-use-case";
import { Device } from "../../../src/domain/entities/device";
import { IDeviceRepository } from "../../../src/domain/repositories/device-repository";
import { DeviceNotFoundError } from "../../../src/interface/http/errors/device-not-found-error";
import { LoggerMock } from "../../mocks/logger-mock";

describe("DeleteDeviceUseCase", () => {
  let usecase: DeleteDeviceUseCase;
  let deviceRepository: IDeviceRepository;

  beforeEach(() => {
    const logger = new LoggerMock();
    deviceRepository = {
      deleteDevice: jest.fn(),
    } as unknown as IDeviceRepository;
    usecase = new DeleteDeviceUseCase(logger, deviceRepository);
  });

  describe("execute", () => {
    it("should call deviceRepository.deleteDevice with the correct parameters", async () => {
      const getSpy = jest
        .spyOn(deviceRepository, "deleteDevice")
        .mockResolvedValueOnce({ success: true });

      const deviceId = "402e07f2-977e-47e1-8ecd-93311d032107";
      await usecase.execute(deviceId);
      expect(getSpy).toHaveBeenCalledWith(deviceId);
    });
    it("should return it was not successfull if the device does not exist", async () => {
      jest
      .spyOn(deviceRepository, "deleteDevice")
      .mockResolvedValueOnce({ success: false });

      const deviceId = "402e07f2-977e-47e1-8ecd-93311d032107";
      expect(await usecase.execute(deviceId)).toEqual({ success: false });
    });
  });
});
