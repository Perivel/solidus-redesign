/**
 * run-server.ts
 * 
 * run-server.ts defines the runServer() function.
 */

import { join } from 'path';
import express from "express";
import { Component } from 'solid-js';
import {
  generateHydrationScript,
  renderToString,
  renderToStringAsync,
  renderToStream,
} from "solid-js/web";
import { renderTags } from "solid-meta";
import {
  Capsule,
  Configuration,
  TagDescription,
  resolveConfig
} from "@solidus-js/core";
import { Middleware } from "./middlewate";

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
  const app = express();
  const appConfig = resolveConfig(config);

  // set middleware
  if (middleware.length > 0) {
    app.use(...middleware);
  }

  // register static assets
  const publicPath = join(process.cwd(), '/dist/public');
  app.use(express.static(publicPath));

  // register the initial route.
  app.get("*", async (req, res) => {

    // we preepare the root component to be rendered.
    const tags: TagDescription[] = [];
    const RootComponent: Component = () => {
      return <Capsule url={req.url} ip={req.ip} env={appConfig.env!} tags={tags}>
        <App />
      </Capsule>
    }

    if (appConfig.ssr! === "stream") {
      // set up streaming ssr.
      renderToStream(() => <RootComponent />).pipe(res);
    } else {
      // the SSR configuration is set to either synchonous or asynchonous SSR.
      try {
        let page: string;

        if (appConfig.ssr! === "async") {
          // set up async ssr.
          page = await renderToStringAsync(() => <RootComponent />);
        } else {
          // set up standard ssr.
          page = renderToString(() => <RootComponent />);
        }

        // we return the rendered application.
        res.status(200).send(`
         <!doctype html>
         <html lang=${appConfig.lang!}>
           <head>
           <link rel="stylesheet" href="index.css" />
           <meta charset=${appConfig.charset!} />
           <meta
             name="viewport"
             content="width=device-width, initial-scale=1"
           />
           <link
             rel="shortcut icon"
             type="image/ico"
             href="favicon.ico"
           />
            ${generateHydrationScript()}
            ${renderTags(tags)}
           </head>
           <body>
             <noscript>JavaScript is required to run this app.</noscript>
             <div id="root">${page}</div>
             <script type="module" src="scripts/client.js" async></script>
           </body>
         </html>
         `);
      } catch (e) {
        console.log((e as Error).message);
        res.status(500).send("Server Error");
      }
    }
  });

  // start the server.
  console.log(`Starting app in ${appConfig.ssr!} mode.`);
  app
    .listen(appConfig.port!, () => console.log(`Application successfully running on ${appConfig.host!}:${appConfig.port!}`))
    .on("error", (e) => {
      throw e;
    });
};