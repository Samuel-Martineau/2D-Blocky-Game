export const roundPrecision = (n: number, p: number) =>
  Math.round(n * 10 ** p) / 10 ** p;
