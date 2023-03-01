import { AnyObject } from '@interfaces/IUtility';

const sortObject = <T>(obj: AnyObject<T>) =>
  Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      const typedKey = key as keyof typeof obj;
      acc[typedKey] = obj[typedKey];
      return acc;
    }, {} as typeof obj);

const hashQueryKey = <T>(array: T[]) => {
  const sortedArray = array
    .map((item) => {
      if (Array.isArray(item)) return item.sort((a, b) => (a > b ? 1 : -1));
      if (typeof item === 'object') return sortObject(item);
      return item;
    })
    .sort((a, b) => (a > b ? 1 : -1));
  return JSON.stringify(sortedArray);
};

export default hashQueryKey;
