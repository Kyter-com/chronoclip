/* @refresh reload */
import { render } from "solid-js/web";

// CSS
import "./index.css";

// Types
import type { Component } from "solid-js";

const Index: Component = () => {
  return (
    <main>
      <h1 class="title">remurl</h1>
      <form>
        <input type="text" placeholder="Timestamp" />
      </form>

      <div class="time-container">
        <div class="time-tile">
          <p>To Date String</p>
          <code>timestamp here</code>
        </div>
        <div class="time-tile">
          <p>UNIX Timestamp</p>
        </div>
        <div class="time-tile">
          <p>ISO Timestamp</p>
        </div>
        <div class="time-tile">
          <p>time</p>
        </div>
        <div class="time-tile">
          <p>JWT Timestamp?</p>
          <code>timestamp here</code>
        </div>
        <div class="time-tile">
          <p>JWT Timestamp?</p>
        </div>
        <div class="time-tile">
          <p>JWT Timestamp?</p>
        </div>
      </div>
    </main>
  );
};

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <Index />, root!);
