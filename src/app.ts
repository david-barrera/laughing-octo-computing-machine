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
  DEVICE_CONTROLLER,
  DEVICE_REPOSITORY,
  LOGGER,
} from "./app.di";
import { DataSource } from "typeorm";
import { DeviceRoutes } from "./interface/http/device-routes";
import { AppDataSourceOptions } from "./infrastructure/configs/typeorm.config";
import { AppConfig } from "./infrastructure/configs/app.config";
import { Log4JsLogger } from "./infrastructure/loggers/log4js-logger";

export class App {
  private readonly dependencies: Map<Symbol, any> = new Map();

  constructor(private readonly app: Application) {}
  async bootstrap() {
    this.loadDependencies();
  }

  listen(port: number, callback: () => void) {
    this.app.listen(port, callback).addListener("error", (error: Error) => {
      console.error(error);
      console.error("Server failed to start");
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
        this.dependencies.get(DEVICE_REPOSITORY),
      )
    );
    this.dependencies.set(
      DEVICE_CONTROLLER,
      new DeviceController(this.dependencies.get(CREATE_DEVICE_USE_CASE))
    );
    this.config();
    this.routes();
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
