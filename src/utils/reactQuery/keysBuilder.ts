// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntryKeys = Record<string, (...args: any) => (string | number)[]>;

const keysBuilder = <T>(entryKeys: EntryKeys, baseKey: string) => {
  const keys: EntryKeys = {};
  for (const [key, value] of Object.entries(entryKeys)) {
    keys[key] = (...args: T[]) => [baseKey, key, ...value(...args)];
  }
  return keys;
};

export default keysBuilder;
