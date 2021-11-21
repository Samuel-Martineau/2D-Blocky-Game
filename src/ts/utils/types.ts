export type RepeatString<
  S extends string,
  N extends number,
  C extends 0[] = [0]
> = C['length'] extends N ? S : `${S}${RepeatString<S, N, [0, ...C]>}`;

export type FixedLengthArray<
  T,
  N extends number,
  R extends T[] = []
> = R['length'] extends N ? R : FixedLengthArray<T, N, [T, ...R]>;

export type Grid<T, W extends number, H extends number> = FixedLengthArray<
  FixedLengthArray<T, H>,
  W
>;
