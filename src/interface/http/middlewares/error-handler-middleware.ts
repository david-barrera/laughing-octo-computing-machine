import { NextFunction, Request, Response } from "express";
import { ILogger } from "../../../infrastructure/interfaces/logger";

export const createErrorHandlerMiddleware = (logger: ILogger) => {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  };
};
