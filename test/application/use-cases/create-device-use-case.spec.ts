import { CreateDeviceUseCase } from "../../../src/application/use-cases/create-device-use-case";
import { Device } from "../../../src/domain/entities/device";
import { IDeviceRepository } from "../../../src/domain/repositories/device-repository";

describe("CreateDeviceUseCase", () => {
  let usecase: CreateDeviceUseCase;
  let deviceRepository: IDeviceRepository;

  beforeEach(() => {
    deviceRepository = {
      createDevice: jest.fn(),
    } as IDeviceRepository;
    usecase = new CreateDeviceUseCase(deviceRepository);
  });

  describe("execute", () => {
    it("should call deviceRepository.create with the correct parameters", async () => {
      const createSpy = jest
        .spyOn(deviceRepository, "createDevice")
        .mockResolvedValueOnce({} as Device);

        const createInput = { name: "Device name", brand: "Brand name" };
      await usecase.execute(createInput);
      expect(createSpy).toHaveBeenCalledWith({
        ...createInput
      });
    });
  });
});
