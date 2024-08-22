import { IDatabaseCredentials } from "../interfaces/database-credentials";

export interface IAppConfig {
  databaseCredentials: () => IDatabaseCredentials;
}

export class AppConfig implements IAppConfig {
  databaseCredentials(): IDatabaseCredentials {
    return {
      host: this.requiredConfig(process.env.DB_HOST),
      port: parseInt(this.requiredConfig(process.env.DB_PORT)),
      username: this.requiredConfig(process.env.DB_USERNAME),
      password: this.requiredConfig(process.env.DB_PASSWORD),
    };
  }

  private requiredConfig(envVariable: string | undefined): string {
    if (!envVariable) {
      throw new Error("Missing required environment variable");
    }
    return envVariable;
  }
}
