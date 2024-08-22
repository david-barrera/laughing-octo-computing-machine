import { DataSourceOptions } from "typeorm";

export interface TypeormCredentials {
  host: string;
  port: number;
  username: string;
  password: string;
}

export function AppDataSourceOptions(
  credentials: TypeormCredentials
): DataSourceOptions {
  return {
    type: "postgres",
    database: "device-service",
    entities: [__dirname + "/../models/**/*-model.{js,ts}"],
    synchronize: true,
    ...credentials,
  };
}
