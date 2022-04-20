import { Component, createSignal } from 'solid-js';
import { useServer, useEnvironment, useIsClient, useIsServer } from '@solidus-js/utilities';
import { Title } from 'solid-meta';

const App: Component = () => {
  const [count, setCount] = createSignal(0);

  const increment = () => setCount(count() + 1);
  const decrement = () => setCount(count() - 1);

  return (
    <>
    <Title>Foo</Title>
    <div class="App">
      <header class="header">
        <img src='./logo.svg' class="logo" alt="logo" />
        <p>Count: {count()}</p>
        <button class="btn" onClick={increment}>Increment</button>
        <button class="btn" onClick={decrement}>Decrement</button>
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
