/* @refresh reload */
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

// Utils
import { get_local_iso_date } from "./utils";

// CSS
import "./index.css";

// Types
import type { Component } from "solid-js";

const Index: Component = () => {
  const [unix_timestamp, set_unix_timestamp] = createSignal<number>(Date.now());
  const [iso_timestamp, set_iso_timestamp] = createSignal<string>(
    new Date().toISOString()
  );
  const [locale_string, set_locale_string] = createSignal<string>(
    new Date().toLocaleString()
  );
  const [locale_iso_timestamp, set_locale_iso_timestamp] = createSignal<string>(
    get_local_iso_date()
  );

  return (
    <main>
      <h1 class="title">remurl</h1>
      <form>
        <input type="text" placeholder="Timestamp" />
      </form>

      <div class="time-container">
        <div class="time-tile">
          <p>UNIX</p>
          <code>{unix_timestamp()}</code>
        </div>
        <div class="time-tile">
          <p>ISO (UTC)</p>
          <code>{iso_timestamp()}</code>
        </div>
        <div class="time-tile">
          <p>Locale String</p>
          <code>{locale_string()}</code>
        </div>
        <div class="time-tile">
          <p>ISO Timestamp (local)</p>
          <code>{locale_iso_timestamp()}</code>
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
