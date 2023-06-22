export type AnyObject<T> = Record<keyof T, unknown>;

export type ObjectEntries<T> = {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];
  