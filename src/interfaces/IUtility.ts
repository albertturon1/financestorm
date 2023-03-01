export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

export type AnyObject<T> = Record<keyof T, unknown>;