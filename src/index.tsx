/* @refresh reload */
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

// Utils
import { get_local_iso_date, parse_input_date } from "./utils";

// CSS
import "./index.css";

// Types
import type { Component } from "solid-js";

const Index: Component = () => {
  const [unix_timestamp, set_unix_timestamp] = createSignal<number | string>(
    Date.now()
  );
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
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Timestamp"
          onInput={(e) => {
            console.log(e.currentTarget.value);
            const value = parse_input_date(e.currentTarget.value);
            if (!value) return; // TODO: Parse error
            // TODO: Handle empty input state

            if (!e.currentTarget.value) {
              set_iso_timestamp(new Date().toISOString());
              set_locale_string(new Date().toLocaleString());
              set_locale_iso_timestamp(get_local_iso_date());
              set_unix_timestamp(Date.now());
            }

            try {
              set_iso_timestamp(value.toISOString());
            } catch (e) {
              set_iso_timestamp("Invalid Date");
            }

            try {
              set_locale_string(value.toLocaleString());
            } catch (e) {
              set_locale_string("Invalid Date");
            }

            try {
              set_locale_iso_timestamp(get_local_iso_date(value));
            } catch (e) {
              set_locale_iso_timestamp("Invalid Date");
            }

            try {
              if (!Number.isNaN(value.getTime())) {
                set_unix_timestamp(value.getTime());
              } else set_unix_timestamp("Invalid Date");
            } catch (e) {
              set_unix_timestamp("Invalid Date");
            }
          }}
        />
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
