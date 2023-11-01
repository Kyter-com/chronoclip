import { expect, test } from "vitest";

import { parse_input_date, this_time_ago } from "../src/utils";

test("UNIX date is correctly parsed", () => {
  const date = parse_input_date(-6106033902000);

  expect(date?.toDateString()).toBe("Thu Jul 04 1776");
});

test("ISO date is correctly parsed", () => {
  const date = parse_input_date("1776-07-04T12:00:00.000Z");

  expect(date?.toDateString()).toBe("Thu Jul 04 1776");
});

test("Natural date is correctly parsed", () => {
  const date = parse_input_date("July 4, 1776");

  expect(date?.toDateString()).toBe("Thu Jul 04 1776");
});

test("Invalid date returns null", () => {
  const date = parse_input_date("Vitest is great!");

  expect(date).toBe(null);
});

test("Relative time is correctly returned", () => {
  const date = new Date();
  const time_ago = this_time_ago(date);
  expect(time_ago).toBe("now");

  const oneMinuteAgo = new Date(date.getTime() - 60000);
  const oneMinuteAgoTimeAgo = this_time_ago(oneMinuteAgo);
  expect(oneMinuteAgoTimeAgo).toBe("1 minute ago");
});

test("UNIX timestamps are parsed between seconds and milliseconds", () => {
  const seconds = "1022742000";
  const milliseconds = "1022742000000";

  const seconds_date = parse_input_date(seconds);
  const milliseconds_date = parse_input_date(milliseconds);

  expect(seconds_date?.toDateString()).toBe("Thu May 30 2002");
  expect(milliseconds_date?.toDateString()).toBe("Thu May 30 2002");
});

// TODO: Add another box or info about if unix timestamp is in seconds or milliseconds
