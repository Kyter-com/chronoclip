/* @refresh reload */
import { render } from "solid-js/web";

// Assets
import logo from "./logo.svg";

// CSS
import "./index.css";

// Types
import type { Component } from "solid-js";

const Index: Component = () => {
  return (
    <div class="App">
      <header class="header">
        <img src={logo} class="logo" alt="logo" />
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

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <Index />, root!);
