import { runApp, Middleware } from '@solidus-js/core';
import App from './App';

const logMiddleware: Middleware = async (req, res, next) => {
    console.log(`Received request from ${req.ip}`);
    next();
}

runApp(App, {
    config: {
        ssr: 'sync'
    },
    middleware: [logMiddleware]
})