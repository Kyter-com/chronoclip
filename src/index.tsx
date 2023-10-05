/* @refresh reload */
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

// Utils
import {
  get_local_iso_date,
  parse_input_date,
  this_time_ago,
  copy_to_clipboard,
} from "./utils";

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
  const [locale_date_string, set_locale_date_string] = createSignal<string>(
    new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [relative_date, set_relative_date] = createSignal<string>(
    this_time_ago(new Date())
  );

  return (
    <main>
      <h1 class="title">chronoclip</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Timestamp"
          onInput={(e) => {
            const input = e.currentTarget.value;
            const value = parse_input_date(input);

            // If the date parsing fails and null is returned, set "Invalid Date"
            if (!value) {
              set_iso_timestamp("Invalid Date");
              set_locale_string("Invalid Date");
              set_locale_iso_timestamp("Invalid Date");
              set_unix_timestamp("Invalid Date");
              set_locale_date_string("Invalid Date");
              set_relative_date("Invalid Date");
              return;
            }

            // If the input is empty, default to current date
            if (!input) {
              set_iso_timestamp(new Date().toISOString());
              set_locale_string(new Date().toLocaleString());
              set_locale_iso_timestamp(get_local_iso_date());
              set_unix_timestamp(Date.now());
              set_locale_date_string(
                new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              );
              set_relative_date(this_time_ago(new Date()));
              return;
            }

            set_iso_timestamp(value.toISOString());
            set_locale_string(value.toLocaleString());
            set_locale_iso_timestamp(get_local_iso_date(value));
            set_unix_timestamp(value.getTime());
            set_locale_date_string(
              value.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            );
            set_relative_date(this_time_ago(value));
          }}
        />
      </form>

      <div class="time-container">
        <div class="time-tile">
          <p>UNIX</p>
          <code onClick={async () => await copy_to_clipboard(unix_timestamp())}>
            {unix_timestamp()}
          </code>
        </div>
        <div class="time-tile">
          <p>ISO (UTC)</p>
          <code onClick={async () => await copy_to_clipboard(iso_timestamp())}>
            {iso_timestamp()}
          </code>
        </div>
        <div class="time-tile">
          <p>Locale String</p>
          <code onClick={async () => await copy_to_clipboard(locale_string())}>
            {locale_string()}
          </code>
        </div>
        <div class="time-tile">
          <p>ISO (local)</p>
          <code
            onClick={async () =>
              await copy_to_clipboard(locale_iso_timestamp())
            }
          >
            {locale_iso_timestamp()}
          </code>
        </div>
        <div class="time-tile">
          <p>Locale Date String</p>
          <code onClick={async () => copy_to_clipboard(locale_date_string())}>
            {locale_date_string()}
          </code>
        </div>
        <div class="time-tile">
          <p>Relative Time</p>
          <code onClick={async () => copy_to_clipboard(relative_date())}>
            {relative_date()}
          </code>
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
