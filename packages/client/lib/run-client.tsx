import { Component } from 'solid-js';
import { hydrate } from 'solid-js/web';
import { Configuration, Capsule } from '@solidus-js/core';
import { useServer } from '@solidus-js/utilities';

/**
 * runClient()
 * 
 * Renders the application on the client.
 * @note This function only works on the client side.
 * @param App The application to render.
 * @param config The configuration object.
 */

export const runClient = (App: Component, config: Configuration): () => void => {
    const server = useServer();
    const ClientComponent = () => <Capsule url={server()?.url || '/'} tags={[]} env={config.env}>
        <App />
    </Capsule>;
    
    return hydrate(() => <ClientComponent />, document);
}