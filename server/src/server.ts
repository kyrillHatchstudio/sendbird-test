/**
 * Entry file to start server
 */

import Dotenv from 'dotenv'
import path from 'path'
Dotenv.config({
    path: path.resolve(__dirname, '../.env')
})
import express from 'express'
import logger from './utils/logger'
import { applyMiddleware, applyErrorMiddleware } from './middleware'
import { applyStaticRouting, applyProxy } from './routes'
import applyBasicAuth from './middleware/authenticaton'
import { applyHealthCheck } from './middleware/healthChecks'
import { applyRedirectForceToSSL } from './middleware/redirectToSSL'

// ERROR HANDLER
process.on('uncaughtException', (e: Error) => {
    logger.error(`UncaughtException: ${e}`)
    process.exit(1)
})
process.on('unhandledRejection', (e: Error) => {
    logger.error(`unhandledRejection: ${e}`)
    process.exit(1)
})

const app = express()
const port = process.env.PORT || 8000

logger.info('Starting SPA-server');

// HEALTH CHECKS
// for GKE ingress as of https://cloud.google.com/kubernetes-engine/docs/concepts/ingress#health_checks
applyHealthCheck(app);

applyRedirectForceToSSL(app);

// BASIC AUTH
applyBasicAuth(app);

// PROXY
// Make sure to apply the proxy before any middlewares as this could change the original request headers/ body
applyProxy(app)

// MIDDLEWARE
applyMiddleware(app)

// ROUTE
applyStaticRouting(app)

// ERROR CATCHING
applyErrorMiddleware(app)


app.listen(port, () => {
    logger.info(`Server started on port ${port} in mode ${process.env.NODE_ENV}`)
})