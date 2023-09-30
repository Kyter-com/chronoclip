// TODO: Clean this up and give credit https://stackoverflow.com/questions/49330139/date-toisostring-but-local-time-instead-of-utc
const get_local_iso_date = () => {
  const d = new Date();
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

export { get_local_iso_date };

// TODO: Use https://github.com/kensnyder/any-date-parser?
