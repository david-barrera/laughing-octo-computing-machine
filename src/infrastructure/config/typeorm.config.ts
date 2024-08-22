import { DataSourceOptions } from "typeorm";

export const AppDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "database",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "device-service",
  entities: [__dirname + "/../models/**/*.ts"],
  synchronize: true,
};
