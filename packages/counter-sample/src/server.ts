import { runServer, Middleware } from '@solidus-js/server';
import App from './App';
import config from './config';

const logMiddleware: Middleware = async (req, res, next) => {
    console.log(`Received request from ${req.ip}`);
    next();
}

runServer(App, config,[logMiddleware]);