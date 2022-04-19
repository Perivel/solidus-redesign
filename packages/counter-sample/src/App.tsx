import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <div class="App">
      <header class="header">
        <img src='./logo.svg' class="logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
  );
};

export default App;
