import { NextFunction, Request, Response } from "express";
import { ILogger } from "../../../infrastructure/interfaces/logger";
import { BaseHttpError } from "../errors/base-http-error";

export const createErrorHandlerMiddleware = (logger: ILogger) => {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message);
    if (error instanceof BaseHttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  };
};
