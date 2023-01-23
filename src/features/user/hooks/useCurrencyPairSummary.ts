import { Record } from 'pocketbase';

import { cutNumber } from '@utils/misc';

export interface PairSummary {
  base_currency: string;
  quote_currency: string;
  min_exchange_rate: number;
  min_base_currency_value: number;
  min_quote_currency_value: number;
  max_exchange_rate: number;
  max_base_currency_value: number;
  max_quote_currency_value: number;
  avg_exchange_rate: number;
  avg_base_currency_value: number;
  avg_quote_currency_value: number;
  appearance: number;
}

export const useCurrencyPairSummary = (transactions: Record[]) => {
  if (!transactions.length) return [];
  return transactions.reduce((acc, t, index) => {
    const accIndex = acc.findIndex(
      (x) =>
        x.base_currency === t.base_currency &&
        x.quote_currency === t.quote_currency,
    );

    if (accIndex === -1)
      // eslint-disable-next-line no-param-reassign
      acc = [
        ...acc,
        {
          base_currency: t.base_currency,
          quote_currency: t.quote_currency,
          appearance: 1,
          min_exchange_rate: t.exchange_rate,
          min_base_currency_value: t.base_currency_value,
          min_quote_currency_value: t.quote_currency_value,
          max_exchange_rate: t.exchange_rate,
          max_base_currency_value: t.base_currency_value,
          max_quote_currency_value: t.quote_currency_value,
          avg_exchange_rate: t.exchange_rate,
          avg_base_currency_value: t.base_currency_value,
          avg_quote_currency_value: t.quote_currency_value,
        },
      ];
    else {
      const current = acc[accIndex];
      acc[accIndex] = {
        ...current,
        appearance: current.appearance + 1,
        min_exchange_rate: Math.min(t.exchange_rate, current.min_exchange_rate),
        min_base_currency_value: Math.min(
          t.base_currency_value,
          current.min_base_currency_value,
        ),
        min_quote_currency_value: Math.min(
          t.quote_currency_value,
          current.min_quote_currency_value,
        ),
        max_exchange_rate: Math.max(t.exchange_rate, current.min_exchange_rate),
        max_base_currency_value: Math.max(
          t.base_currency_value,
          current.min_base_currency_value,
        ),
        max_quote_currency_value: Math.max(
          t.quote_currency_value,
          current.min_quote_currency_value,
        ),
        avg_exchange_rate:
          (current.avg_exchange_rate + t.exchange_rate) / (index + 1),
        avg_base_currency_value:
          (current.avg_base_currency_value + t.quote_currency_value) /
          (index + 1),
        avg_quote_currency_value:
          (current.avg_quote_currency_value + t.quote_currency_value) /
          (index + 1),
      };

      acc.forEach((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (typeof value === 'number') {
            const typedKey = key as keyof PairSummary;
            item[typedKey] = cutNumber(value, 4);
          }
        }
      });
    }

    return acc;
  }, [] as PairSummary[]);
};
