import { Request, Response, NextFunction, Application } from "express";
import * as ErrorHandler from "../utils/errorHandler";

const addErrorHandler = (app: Application) => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.handleError(err, res, next);
  });
};

export default [addErrorHandler];