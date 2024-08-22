
import { SearchDeviceUseCase } from "../../../src/application/use-cases/search-device-use-case";
import { Device } from "../../../src/domain/entities/device";
import { IDeviceRepository } from "../../../src/domain/repositories/device-repository";
import { LoggerMock } from "../../mocks/logger-mock";

describe("SearchDeviceUseCase", () => {
  let usecase: SearchDeviceUseCase;
  let deviceRepository: IDeviceRepository;

  beforeEach(() => {
    const logger = new LoggerMock();
    deviceRepository = {
      searchDevice: jest.fn(),
    } as unknown as IDeviceRepository;
    usecase = new SearchDeviceUseCase(logger, deviceRepository);
  });

  describe("execute", () => {
    it("should call deviceRepository.searchDevice with the correct parameters", async () => {
      const deviceId = "402e07f2-977e-47e1-8ecd-93311d032107";
      const device = {
        id: deviceId,
        name: "Device name",
        brand: "Brand name",
      } as Device;
      const searchInput = { brand: "Brand name" };
      const getSpy = jest
        .spyOn(deviceRepository, "searchDevice")
        .mockResolvedValueOnce({ items: [device], totalItems: 1 });

      await usecase.execute(searchInput,{ page: 1, pageSize: 10 });
      expect(getSpy).toHaveBeenCalledWith(searchInput,{ page: 1, pageSize: 10 });
    });
  });
});
