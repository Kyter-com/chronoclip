// TODO: Clean this up and give credit https://stackoverflow.com/questions/49330139/date-toisostring-but-local-time-instead-of-utc
const get_local_iso_date = (q?: any) => {
  const d = q || new Date();
  const z = (n: any) => ("0" + n).slice(-2);
  let off = d.getTimezoneOffset();
  const sign = off < 0 ? "+" : "-";
  off = Math.abs(off);
  return (
    new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, -1) +
    sign +
    z((off / 60) | 0) +
    ":" +
    z(off % 60)
  );
};

const parse_input_date = (date: unknown) => {
  let value;

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

  return value;
};

export { get_local_iso_date, parse_input_date };

// TODO: Use https://github.com/kensnyder/any-date-parser?
