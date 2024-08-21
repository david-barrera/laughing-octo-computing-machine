import { Application } from "express";
import * as bodyParser from "body-parser";

export class App {
    private readonly dependencies: Map<string, any> = new Map();

    constructor(private readonly app: Application) {

    }
    async bootstrap() {

    }

    listen(port: number, callback: () => void) {
      this.app.listen(port, callback).addListener("error", (error: Error) => {
        console.error(error);
        console.error("Server failed to start");
      });
    }

    private config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    private routes() {
    }
}
