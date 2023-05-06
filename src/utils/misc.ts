import { isValidElement, ReactElement } from 'react';

import clsx from 'clsx';
import { PartialShallow, some } from 'lodash';
import { DateTime } from 'luxon';
import { ReadonlyURLSearchParams } from 'next/navigation';
import QueryString from 'query-string';
import { twMerge } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';

import { Currency } from '@interfaces/ICurrency';
import { AnyObject } from '@interfaces/IUtility';

export const genQueryString = (params: object | undefined): string => {
  if (!params || !Object.keys(params).length) return '';
  return QueryString.stringify(params);
};

export const isObjectEmpty = (obj?: object) => !obj || !Object.keys(obj).length;

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

type Sort = 'asc' | 'desc';

export const sortObjectByKey = <T extends object>(
  object: T,
  sort: Sort = 'asc',
) => {
  const objectKeys = Object.keys(object);
  const reduceObject = (obj: T, key: string) => {
    obj[key as keyof T] = object[key as keyof T];
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

export const cutNumber = (number: number, n = 3) => Number(number.toFixed(n));

export const nameOfKey = <T extends AnyObject<T>>(
  obj: T | undefined,
  expression: (x: { [Property in keyof T]: () => string }) => () => string,
): string => {
  if (!obj) return '';
  const res: { [Property in keyof T]: () => string } = {} as {
    [Property in keyof T]: () => string;
  };

  Object.keys(obj).forEach((k) => (res[k as keyof T] = () => k));

  return expression(res)();
};

export const includedInGenericArray = <T>(array: T[], item: T) =>
  typeof item === 'string'
    ? array.includes(item)
    : some(array, item as PartialShallow<T>);

export type RenderItem<T> = ReactElement | ((data: T) => ReactElement);

export const renderChildren = <T>(item: RenderItem<T> | undefined, data: T) => {
  if (!item) return null;
  return isValidElement(item)
    ? item
    : (item as (data: T) => ReactElement)(data);
};

export const dateDiff = (
  startDate: string,
  endDate: string,
  type: 'years' | 'months' | 'days' = 'months',
) => {
  const start_date = DateTime.fromISO(startDate);
  const end_date = DateTime.fromISO(endDate);

  return end_date.diff(start_date, [type]).toObject();
};

export const isBrowser = typeof window !== 'undefined';

export const xAxisInterval = (monthsDiff: number) => {
  const diff = Math.ceil(monthsDiff + 1);
  // eslint-disable-next-line sonarjs/prefer-immediate-return
  return Math.pow(2, Math.round(Math.log(diff) / Math.log(2)));
};

export function valuesDifferenceInPercentage(rates: number[]) {
  const [oldestValue] = rates;
  const [newestValue] = rates.slice(-1);

  return ((newestValue - oldestValue) / oldestValue) * 100;
}

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(clsx(inputs));
}

export function inverseCurrecyRate(rate: number) {
  const newValue = rate ** -1;
  return cutNumber(newValue, newValue < 1 ? 5 : 3);
}

export function baseCurrenciesFromQuery(
  base: string | undefined,
  quoteCurrency: Currency,
) {
  if (!base || !base.length || typeof base !== 'string') return;
  return base
    .split(',')
    .filter((c) => c !== quoteCurrency) //remove quote currency from results
    .map((c) => c.trim()) as Currency[];
}

export function createQueryString({
  param,
  value,
  searchParams,
}: {
  param: string;
  value: string;
  searchParams: ReadonlyURLSearchParams;
}) {
  const params = new URLSearchParams(searchParams);
  params.set(param, value);

  return params.toString().replace(/%2C/g, ','); //replacing %2C from ,
}
