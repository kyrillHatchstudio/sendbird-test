/**
 * Logging via winston
 */

import winston from 'winston'


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      level: 'error', filename: process.env.LOG_TO_ERROR
    }),
    new winston.transports.File({
      filename: process.env.LOG_TO_COMBINED
    })
  ]
})

// write to console too for kubectl logging
logger.add(new winston.transports.Console({}))

export default logger
