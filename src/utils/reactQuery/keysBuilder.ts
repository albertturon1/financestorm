// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntryKeys<T> = Record<string, (...args: any) => T[]>;

const keysBuilder = <T>(entryKeys: EntryKeys<T>, baseKey: string) => {
  const keys: EntryKeys<T> = {};
  for (const [key, value] of Object.entries(entryKeys)) {
    keys[key] = (...args: T[]) => [baseKey, key, ...value(...args)];
  }
  return keys;
};

export default keysBuilder;
