/**
 * Authentication Middleware used right as first middleware
 */
import { Application } from 'express';
import basicAuth, { BasicAuthMiddlewareOptions } from 'express-basic-auth';
import { CustomError } from '../utils/CustomError';

const acceptedCredentials = {
    name: process.env.BASIC_AUTH_NAME,
    pass: process.env.BASIC_AUTH_PASS
}


/**
 * Apply basic authentication, to protect served apps
 */
const applyBasicAuth = (app: Application) => {
    // make sure once, that your env variables are set
    if (!acceptedCredentials.name || !acceptedCredentials.pass) {
        throw new CustomError({
            message: 'Missing credentials to check against',
            name: 'MissingBasicAuthError'
        }, 500)
    }

    const basicAuthOptions: BasicAuthMiddlewareOptions = {
        users: {
            [acceptedCredentials.name]: acceptedCredentials.pass
        },
        unauthorizedResponse: (req: basicAuth.IBasicAuthedRequest) => {
            return req.auth
                ? (`Credentials ${req.auth.user}:${req.auth.password} rejected`)
                : 'No credentials provided';
        },
        challenge: true, // show popup in browsers
        realm: 'solavieve-spa-server'
    };
    // if the request has legit authorization header, will add auth property to req object (containing user and password)
    app.use(basicAuth(basicAuthOptions));
}

export default applyBasicAuth;