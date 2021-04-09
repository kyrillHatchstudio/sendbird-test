import express, {Application } from 'express';
import path from 'path';

const applyStaticRouting = (app: Application) => {
    // all other requests should be handled by SPA
    const frontendPath = path.resolve(__dirname, process.env.SPA_BUILD_FOLDER || 'error-dir');
    app.use(express.static(frontendPath));
    app.get('*', function (req, res) {
        const pathToIndex = path.resolve(frontendPath, 'index.html');
        res.sendFile(pathToIndex);
    });
}

export default applyStaticRouting;