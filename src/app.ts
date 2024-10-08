import "reflect-metadata";
import "dotenv/config";
import { Application } from "express";
import * as bodyParser from "body-parser";
import { DeviceController } from "./infrastructure/controllers/device-controllers";
import { CreateDeviceUseCase } from "./application/use-cases/create-device-use-case";
import { DeviceRepositoryTypeormImpl } from "./infrastructure/repositories/device-repository-typeorm-impl";
import {
  APP_DATASOURCE,
  CREATE_DEVICE_USE_CASE,
  DELETE_DEVICE_USE_CASE,
  DEVICE_CONTROLLER,
  DEVICE_REPOSITORY,
  GET_DEVICE_USE_CASE,
  LIST_DEVICES_USE_CASE,
  LOGGER,
  SEARCH_DEVICE_USE_CASE,
  UPDATE_DEVICE_USE_CASE,
} from "./app.di";
import { DataSource } from "typeorm";
import { DeviceRoutes } from "./interface/http/device-routes";
import { AppDataSourceOptions } from "./infrastructure/configs/typeorm.config";
import { AppConfig } from "./infrastructure/configs/app.config";
import { Log4JsLogger } from "./infrastructure/loggers/log4js-logger";
import { createErrorHandlerMiddleware } from "./interface/http/middlewares/error-handler-middleware";
import { GetDeviceUseCase } from "./application/use-cases/get-device-use-case";
import { ListDevicesUseCase } from "./application/use-cases/list-devices-use-case";
import { UpdateDeviceUseCase } from "./application/use-cases/update-device-use-case";
import { DeleteDeviceUseCase } from "./application/use-cases/delete-device-use-case";
import { SearchDeviceUseCase } from "./application/use-cases/search-device-use-case";

export class App {
  private readonly dependencies: Map<Symbol, any> = new Map();

  constructor(private readonly app: Application) {}
  async bootstrap() {
    this.config();
    await this.loadDependencies();
    this.routes();
    this.app.use(createErrorHandlerMiddleware(this.dependencies.get(LOGGER)));
  }

  listen() {
    const port = process.env.PORT || 3000;
    const logger = this.dependencies.get(LOGGER);
    this.app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  }

  private async loadDependencies() {
    const appConfig = new AppConfig();
    this.dependencies.set(LOGGER, new Log4JsLogger());
    this.dependencies.set(
      APP_DATASOURCE,
      await new DataSource(
        AppDataSourceOptions(appConfig.databaseCredentials())
      ).initialize()
    );
    this.dependencies.set(
      DEVICE_REPOSITORY,
      new DeviceRepositoryTypeormImpl(this.dependencies.get(APP_DATASOURCE))
    );
    this.dependencies.set(
      CREATE_DEVICE_USE_CASE,
      new CreateDeviceUseCase(
        this.dependencies.get(LOGGER),
        this.dependencies.get(DEVICE_REPOSITORY)
      )
    );
    this.dependencies.set(
      GET_DEVICE_USE_CASE,
      new GetDeviceUseCase(
        this.dependencies.get(LOGGER),
        this.dependencies.get(DEVICE_REPOSITORY)
      )
    );
    this.dependencies.set(
      LIST_DEVICES_USE_CASE,
      new ListDevicesUseCase(
        this.dependencies.get(LOGGER),
        this.dependencies.get(DEVICE_REPOSITORY)
      )
    );
    this.dependencies.set(
      UPDATE_DEVICE_USE_CASE,
      new UpdateDeviceUseCase(
        this.dependencies.get(LOGGER),
        this.dependencies.get(DEVICE_REPOSITORY)
      )
    );
    this.dependencies.set(
      DELETE_DEVICE_USE_CASE,
      new DeleteDeviceUseCase(
        this.dependencies.get(LOGGER),
        this.dependencies.get(DEVICE_REPOSITORY)
      )
    );
    this.dependencies.set(
      SEARCH_DEVICE_USE_CASE,
      new SearchDeviceUseCase(
        this.dependencies.get(LOGGER),
        this.dependencies.get(DEVICE_REPOSITORY)
      )
    );

    this.dependencies.set(
      DEVICE_CONTROLLER,
      new DeviceController(
        this.dependencies.get(CREATE_DEVICE_USE_CASE),
        this.dependencies.get(GET_DEVICE_USE_CASE),
        this.dependencies.get(LIST_DEVICES_USE_CASE),
        this.dependencies.get(UPDATE_DEVICE_USE_CASE),
        this.dependencies.get(DELETE_DEVICE_USE_CASE),
        this.dependencies.get(SEARCH_DEVICE_USE_CASE)
      )
    );
  }
  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  private routes() {
    this.app.use(
      new DeviceRoutes(this.dependencies.get(DEVICE_CONTROLLER)).init()
    );
  }
}
