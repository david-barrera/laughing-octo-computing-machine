import { Application } from "express";
import * as bodyParser from "body-parser";
import { DeviceController } from "./infrastructure/controllers/device-controllers";
import { CreateDeviceUseCase } from "./application/use-cases/create-device-use-case";
import { DeviceRepositoryTypeormImpl } from "./infrastructure/repositories/device-repository-typeorm-impl";
import {
  APP_DATASOURCE,
  CREATE_DEVICE_USE_CASE,
  DEVICE_REPOSITORY,
} from "./app.di";
import { DataSource } from "typeorm";
import { AppDataSourceOptions } from "./infrastructure/config/typeorm.config";

export class App {
  private readonly dependencies: Map<string, any> = new Map();

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

  private loadDependencies() {
    this.dependencies.set(APP_DATASOURCE, new DataSource(AppDataSourceOptions));
    this.dependencies.set(
      DEVICE_REPOSITORY,
      new DeviceRepositoryTypeormImpl(this.dependencies.get(APP_DATASOURCE))
    );
    this.dependencies.set(
      CREATE_DEVICE_USE_CASE,
      new CreateDeviceUseCase(this.dependencies.get(DEVICE_REPOSITORY))
    );
    this.config();
    this.routes;
  }
  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  private routes() {}
}
