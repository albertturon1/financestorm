import { InfiniteData } from '@tanstack/react-query';
import QueryString from 'query-string';

export const genQueryString = (params: object | undefined): string => {
  if (!params || !Object.keys(params).length) return '';
  return QueryString.stringify(params);
};

export const isObjectEmpty = (obj?: object) => !obj || !Object.keys(obj).length;

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const dataArrayResponseHasValues = <T>(
  array: InfiniteData<T> | undefined,
): boolean => {
  if (!array) return false;
  return array.pages.length > 0;
};

export const arrayHasValues = <T>(array: T[] | undefined): boolean => {
  if (!array) return false;
  return array.length > 0;
};

export const removeNumberFromKey = <T extends string>(key: T) =>
  key.split('. ')[1].split(' ').join('_').toLowerCase();

export const convertStringToSnakeLowercase = (key: string) =>
  key.split(' ').join('_').toLowerCase();

type Sort = 'asc' | 'desc';

export const sortObjectByKey = <T extends object>(
  object: T,
  sort: Sort = 'asc',
) => {
  const objectKeys = Object.keys(object);
  const reduceObject = (obj: T, key: string) => {
    obj[key] = object[key];
    return obj;
  };

  if (sort === 'desc')
    return objectKeys
      .sort()
      .reverse()
      .reduce((obj, key) => reduceObject(obj as T, key), {});

  return Object.keys(object)
    .sort()
    .reduce((obj, key) => reduceObject(obj as T, key), {});
};

export const getFloatBetweenRange = (min = 0, max = 1) =>
  Math.random() * (max - min) + min;

// eslint-disable-next-line func-style
export const cutNumber = (number: number, n = 3) => Number(number.toFixed(n));

export const previousDate = (
  date: Date,
  // eslint-disable-next-line default-param-last
  years?: number,
  months?: number,
  days?: number,
) => {
  const dateCopy = new Date(date);

  if (years) dateCopy.setFullYear(dateCopy.getFullYear() - years);
  if (months) dateCopy.setMonth(dateCopy.getMonth() - months);
  if (days) dateCopy.setDate(dateCopy.getDate() - days);

  return dateCopy;
};

export const serverDate = (date: Date) => date.toISOString().split('T')[0];

const serverDateParts = {
  year: 1,
  month: 2,
};
type ServerDateParts = keyof typeof serverDateParts;

export const serverDateToParts = (
  date: string,
  type: ServerDateParts = 'month',
) => date.split('-').slice(0, serverDateParts[type]).join('-');

export const getNDaysPastServerDate = (days = 1) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - days);

  return serverDate(yesterday);
};

export const yAxisFormater = (number: number) => {
  if (number > 1000000000) {
    return `${(number / 1000000000).toString()}B`;
  } else if (number > 1000000) {
    return `${(number / 1000000).toString()}M`;
  } else if (number > 1000) {
    return `${(number / 1000).toString()}K`;
  } else {
    return number.toString();
  }
};

export const nameOfKey = <T>(
  obj: T,
  expression: (x: { [Property in keyof T]: () => string }) => () => string,
): string => {
  const res: { [Property in keyof T]: () => string } = {} as {
    [Property in keyof T]: () => string;
  };

  Object.keys(obj).forEach((k) => (res[k as keyof T] = () => k));

  return expression(res)();
};

export const on = <T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['addEventListener']>
    | [string, () => void | null, ...unknown[]]
): void => {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>),
    );
  }
};

export const off = <T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, () => void | null, ...unknown[]]
): void => {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>),
    );
  }
};

export const isBrowser = typeof window !== 'undefined';

export const isNavigator = typeof navigator !== 'undefined';
