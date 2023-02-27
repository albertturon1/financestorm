import { AnyObject } from '@interfaces/Utility';

const defaultSortFn = (a: string, b: string) => a.localeCompare(b);

const deepSortObject = <T>(
  obj: AnyObject<T>,
  comparator: (a: string, b: string) => number,
) => {
  let out;

  if (Array.isArray(obj)) {
    return obj.map((item) => deepSortObject(item, comparator));
  }

  if (typeof obj === 'object') {
    out = {};

    Object.keys(obj)
      .sort(comparator || defaultSortFn)
      .forEach((key) => {
        out[key] = sort(obj[key], comparator);
      });

    return out;
  }

  return obj;
};

export default deepSortObject;
