import { Router, Application } from "express"
import cors from "cors"
import parser from "body-parser"
import compression from "compression"
import logger from '../utils/logger'

export const handleCors = (app: Application) =>
  app.use(cors({ credentials: true, origin: true }))

export const handleBodyRequestParsing = (app: Application) => {
  app.use(parser.urlencoded({ extended: true }))
  app.use(parser.json())
}

export const handleCompression = (app: Application) => {
  app.use(compression())
}

export const logInDevelopment = (app: Application) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      logger.info(`${new Date()}: Request ${req.method} at ${req.url}`)
      next()
    })
  }
}


export default [handleCors, handleBodyRequestParsing, handleCompression, logInDevelopment]