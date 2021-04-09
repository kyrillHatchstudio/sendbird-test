import commonMW from './common'
import errorMW from './errorHandler'
import { Application } from 'express'

const middleWare = [...commonMW]

export const applyMiddleware = (app: Application) => {
    for (const f of middleWare) {
        f(app)
    }
}

export const applyErrorMiddleware = (app: Application) => {
    for (const f of errorMW) {
        f(app)
    }
}