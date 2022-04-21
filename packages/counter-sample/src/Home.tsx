import { Component, createSignal } from 'solid-js';
import { Title } from 'solid-meta';
import { useNavigate } from 'solid-app-router';

const Home: Component = () => {
  const [count, setCount] = createSignal(0);
  const navigate = useNavigate();

  const increment = () => setCount(count() + 1);
  const decrement = () => setCount(count() - 1);

  const goToAbout = () => navigate('/about');

  
  return (
    <>
    <Title>Solidus Counter</Title>
    <div class="App">
      <header class="header">
        <img src='./logo.svg' class="logo" alt="logo" />
        <p>Count: {count()}</p>
        <button class="btn" onClick={increment}>Increment</button>
        <button class="btn" onClick={decrement}>Decrement</button>
        <button class="btn" onClick={goToAbout}>Learn More</button>
      </header>
    </div>
    </>
  );
};

export default Home;