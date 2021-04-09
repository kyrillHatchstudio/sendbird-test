import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';


const applyProxy = (app: Application) => {
    // make sure, you proxy requests to correct backend
    const proxyTo = process.env.PROXY_BACKEND;
    if (!proxyTo) {
        throw new Error('Please specify in env to which backend to proxy to');
    }
    app.use('/api', createProxyMiddleware({
        target: proxyTo,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
    }));
}

export default applyProxy;