import { Component } from 'solid-js';
import { Title } from 'solid-meta';
import { useServer } from '@solidus-js/utilities';

const About: Component = () => {
    const server = useServer();
    return (
        <>
            <Title>bout Solidus Counter</Title>
            <div class="App">
                <header class="header">
                    <p>This is the about page for Solidus Counter. Oh, by the way, your IP address is {server()?.ip!}</p>
                </header>
            </div>
        </>
    );
};

export default About;