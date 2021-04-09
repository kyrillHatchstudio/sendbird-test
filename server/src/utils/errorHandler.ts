import { Response, NextFunction } from "express"
import logger from "./logger"
import { CustomError } from "./CustomError"

// if an error with this code gets thrown, dont log
const allowedErrorCodes = [404];

export const handleError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    if (!allowedErrorCodes.includes(err.statusCode)) {
      logger.error({
        message: err.message,
        name: err.name,
        code: err.statusCode
      });
    }
    res.status(err.statusCode).json({
      message: err.message
    });
  } else {
    logger.error(err);
    res.status(500).json({
      message: 'Internal error'
    });
  }
}