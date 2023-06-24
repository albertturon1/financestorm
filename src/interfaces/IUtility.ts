export type AnyObject<T> = Record<keyof T, unknown>;

export type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type DataTestID<
  TPrefix extends string,
  YString extends string,
> = YString extends '' ? never : `${TPrefix}${YString}`;
