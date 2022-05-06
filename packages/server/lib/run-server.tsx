/**
 * run-server.ts
 * 
 * run-server.ts defines the runServer() function.
 */

import { Component } from 'solid-js';
import {
  Configuration,
  resolveConfig
} from "@solidus-js/core";
import { Middleware } from "./middleware";
import { HttpServer } from './http-server/http-server';

/**
 * runServer()
 *
 * runs the application server.
 * @note THis function is intended to only run on the server.
 * @param App the application component to run.
 * @param config The server configuration.
 * @param middleware An array of Middleware to register.
 */

export const runServer = (
  App: Component,
  config: Configuration = {},
  middleware: Middleware[] = []
): void => {
  const server = new HttpServer(
    App, 
    config, 
    middleware
  );
  server.start();
};