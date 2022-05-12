/**
 * server/http-server.ts
 * 
 * server/http-server.ts defines the HttpServer.
 */

import { join } from 'path';
import Fastify, { FastifyInstance } from 'fastify';
import { Component } from 'solid-js';
import {
    renderToStringAsync,
    renderToStream,
    renderToString,
    generateHydrationScript,
} from 'solid-js/web';
import { renderTags } from 'solid-meta';
import { HttpServerInterface } from './http-server.interface';
import {
    Configuration,
    Middleware
} from './../types';
import {
    Capsule,
    TagDescription
} from './../components';
import { resolveConfig } from './../utilities'

/**
 * HttpServer
 * 
 * The Solidus HttpServer.
 */
export class HttpServer implements HttpServerInterface {

    private readonly _rootComponent: Component;
    private readonly _server: FastifyInstance;
    private readonly _middleware: Middleware[];
    private readonly _config: Configuration;

    constructor(
        root: Component,
        config: Configuration,
        middleware: Middleware[] = [],
    ) {
        this._rootComponent = root;
        this._middleware = middleware;
        this._config = resolveConfig(config);
        this._server = Fastify();
        this._setupServer();
    }

    /**
     * _configureResponse()
     * 
     * configures the response.
     * @param page the stringified page content.
     * @param tags The tags to render.
     * @returns the configured page response.
     */

    private _configureResponse(page: string, tags: TagDescription[]): string {
        return `
        <!DOCTYPE html>
        <html lang="${this._config.lang!}">
          <head>
          <link rel="stylesheet" href="index.css" />
          <meta charset="${this._config.charset!}" />
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
        `;
    }

    /**
     * _configureRootComponent()
     * 
     * configures the root component.
     * @param root the root component.
     * @param url the initial server URL.
     * @param ip the initial request IP address.
     * @param tags the tags array.
     * @returns The configured Root component.
     */

    private _configureRootComponent(root: Component, url: string, ip: string, tags: TagDescription[]): Component<{}> {
        const AppRoot = this._rootComponent;
        return () => {
            return <Capsule 
                env={this._config.env!}
                tags={tags}
                url={url}
                ip={ip}
            >
                <AppRoot />
            </Capsule>
        }
    }

    /**
     * _setupServer()
     * 
     * _setupServer() sets up the HttpServer.
     */

    private _setupServer(): void {
        // register middleware.
        if (this._middleware.length > 0) {
            this._server.use(...this._middleware);
        }

        // register public path.
        this._server.use(express.static(join(process.cwd(), '/dist/public')));

        // register the main route.
        this._server.get('*', async (req, res) => {
            const tags: TagDescription[] = []
            const App = this._configureRootComponent(this._rootComponent, req.url, req.ip, tags);

            if (this._config.ssr! === 'stream') {
                renderToStream(() => <App />).pipe(res);
            }
            else {
                let page: string;

                try {
                    if (this._config.ssr! === 'async') {
                        page = await renderToStringAsync(() => <App />);
                    }
                    else {
                        page = renderToString(() => <App />);
                    }
                    res.send(this._configureResponse(page, tags));
                }
                catch(e) {
                    console.error((e as Error).message);
                    res.status(500).send("Server Error");
                }
            }
        });
    }

    /**
     * start()
     * 
     * start() starts the HttpServer.
     */

    public start(): void {
        this._server.listen(this._config.port!, () => console.log(`Application successfully running on ${this._config.host!}:${this._config.port!}`))
        .on('error', (e) => {
            throw e;
        });
    }
}