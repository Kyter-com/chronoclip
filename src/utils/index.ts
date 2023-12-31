import { DateTime } from "luxon";

// Credit to https://stackoverflow.com/a/65080112
const get_local_iso_date = (starting_date?: Date) => {
  const date = starting_date || new Date();
  const parser = (n: any) => ("0" + n).slice(-2);
  let offset = date.getTimezoneOffset();
  const sign = offset < 0 ? "+" : "-";
  offset = Math.abs(offset);
  return (
    new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, -1) +
    sign +
    parser((offset / 60) | 0) +
    ":" +
    parser(offset % 60)
  );
};

const parse_input_date = (date: any) => {
  let value;

  /* 
    ----------------------- UNIX epoch time in seconds -----------------------
    If the length is 11 or less, it's likely a UNIX timestamp in seconds. Based data off of https://www.epochconverter.com/ and how they parse examples.
    There's a test case to cover seconds vs milliseconds.
    Date comes in as a string from the input so we can check length safely.
  */
  if (date?.length <= 11) {
    try {
      let local = new Date(0);
      local.setUTCSeconds(Number(date));
      value = local;
    } catch (e) {
      value = null;
    }
  }
  if (value && !isNaN(value.getTime())) return value;

  try {
    value = new Date(date as string);
  } catch (e) {
    value = null;
  }

  if (value && !isNaN(value.getTime())) return value;

  try {
    value = new Date(Number(date));
  } catch (e) {
    value = null;
  }

  if (value && !isNaN(value.getTime())) return value;

  return null;
};

const this_time_ago = (date: Date) => {
  try {
    const value = DateTime.fromJSDate(date).toRelative();

    if (value === "in 0 seconds" || value === "0 seconds ago") return "now";
    if (!value) return "Invalid Date";

    return value;
  } catch (e) {
    return "Invalid Date";
  }
};

const copy_to_clipboard = async (text: string | number) => {
  try {
    await navigator.clipboard.writeText(String(text));
  } catch (error) {
    console.error("Error copying to clipboard:", error);
  }
};

export {
  get_local_iso_date,
  parse_input_date,
  this_time_ago,
  copy_to_clipboard,
};
