import clsx from 'clsx';
import { ReadonlyURLSearchParams } from 'next/navigation';
import QueryString from 'query-string';
import { twMerge } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';

import { Currency } from '@interfaces/ICurrency';

export const genQueryString = (params: object | undefined): string => {
  if (!params || !Object.keys(params).length) return '';
  return QueryString.stringify(params);
};

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const cutNumber = (number: number, n = 3) => Number(number.toFixed(n));

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

export function baseCurrenciesWithAmountFromQuery(
  base: string | undefined,
  quoteCurrency: Currency,
) {
  if (!base || !base.length || typeof base !== 'string') return;
  return base
    .split(',')
    .filter((c) => !c.includes(quoteCurrency)) //remove quote currency from results
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
  const params = new URLSearchParams(
    searchParams as unknown as URLSearchParams,
  );
  params.set(param, value);

  return params.toString().replace(/%2C/g, ','); //replacing %2C from ,
}

export function substituePotentialNaNToZero(value: number) {
  if (isNaN(value)) return 0;
  return value;
}
