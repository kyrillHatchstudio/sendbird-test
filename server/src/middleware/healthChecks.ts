import { Application } from "express";
/**
 * This will be used to check if the server is up
 * GKE Ingress does Health checking every 30-60 seconds
 * @param app 
 */
export const applyHealthCheck = (app: Application) => {
    app.get('/healthcheck', (req, res, next) => {
        res.status(200).end();
    })
}