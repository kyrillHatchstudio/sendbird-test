import { Application } from "express";

// if hostname one of the following, dont force redirect
const redirectHostnameWhitelist = ['localhost'];

/**
 * Redirect to ssl
 * @param app 
 */
export const applyRedirectForceToSSL = (app: Application) => {
    app.use((req, res, next) => {
        let redirectNeeded = false;
        if ((process.env.NODE_ENV === 'production' || process.env.NODE_ENV)
            && req.headers['x-forwarded-proto'] !== 'https'
            && !redirectHostnameWhitelist.includes(req.hostname)) {
            redirectNeeded = true;
        }

        if (redirectNeeded) {
            return res.redirect(`https://${req.headers.host}${req.url}`);
        } else {
            return next();
        }
    })
}