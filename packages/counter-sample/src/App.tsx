import type { Component } from 'solid-js';
import { useServer, useEnvironment, useIsClient, useIsServer } from '@solidus-js/utilities';
import { Title } from 'solid-meta';

const App: Component = () => {
  const server = useServer();
  const env = useEnvironment();
  const isClient = useIsClient();
  const isServer = useIsServer();
  return (
    <>
    <Title>Foo</Title>
    <div class="App">
      <header class="header">
        <img src='./logo.svg' class="logo" alt="logo" />
        <p>
          URL: {server()?.url} Environment: {env()} Client: {isClient() ? "true" : "false"} Server: {isServer() ? "true" : "false"}
        </p>
        <a
          class="link"
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
    </>
  );
};

export default App;
