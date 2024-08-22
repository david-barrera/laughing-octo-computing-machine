import { NextFunction, Request, Response } from "express";

export class BaseController {
  [key: string]: Function | unknown;

  constructor() {
    for (const methodName of Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    )) {
      if (methodName !== "constructor") {
        const method = this[methodName];
        if (typeof method === "function") {
          this[methodName] = this.processRequest.bind(this, method.bind(this));
        }
      }
    }
  }

  protected processRequest(
    callback: Function,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    callback(req, res, next).catch((error: unknown) => {
      next(error);
    });
  }
}
