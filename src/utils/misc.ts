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
export function roundNumber(number: number, n = 2) {
  const d = Math.pow(10, n);
  return Math.round((number + Number.EPSILON) * d) / d;
}
