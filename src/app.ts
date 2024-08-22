import "reflect-metadata";
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
} from "./app.di";
import { DataSource } from "typeorm";
import { AppDataSourceOptions } from "./infrastructure/config/typeorm.config";
import { DeviceRoutes } from "./interface/http/device-routes";

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
    this.dependencies.set(
      APP_DATASOURCE,
      new DataSource(
        AppDataSourceOptions({
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "postgres",
        })
      )
    );
    this.dependencies.set(
      DEVICE_REPOSITORY,
      new DeviceRepositoryTypeormImpl(this.dependencies.get(APP_DATASOURCE))
    );
    this.dependencies.set(
      CREATE_DEVICE_USE_CASE,
      new CreateDeviceUseCase(this.dependencies.get(DEVICE_REPOSITORY))
    );
    this.dependencies.set(
      DEVICE_CONTROLLER,
      new DeviceController(this.dependencies.get(CREATE_DEVICE_USE_CASE))
    );
    const dataSource = <DataSource>this.dependencies.get(APP_DATASOURCE);
    await dataSource.initialize();
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
