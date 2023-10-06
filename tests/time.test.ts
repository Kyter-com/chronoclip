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
