'use client';

import { useEffect, useState } from 'react';

import { CURRENCIES } from '@constants/currencies';
import { CurrenciesPairs } from '@features/main/hooks/useCurrentCurrencyRatesData';
import { Transaction } from '@features/user/history/components/Transactions';
import { Currencies } from '@interfaces/ICurrency';
import { getFloatBetweenRange, cutNumber } from '@utils/misc';
import pb from 'src/api/PocketBase';

const getMultipleRandom = (arr: string[], num = 2) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

const decimalPlaces = 4;

export const createTransaction = async (currencies: CurrenciesPairs) => {
  const foreignCurrencies = CURRENCIES.filter((currency) => currency !== 'pln');

  const random = Math.random();
  const plnIndex = random >= 0.5 ? 1 : 0;

  const [foreignCurrency] = getMultipleRandom(foreignCurrencies, 1);

  const base_currency: Currencies =
    plnIndex === 0 ? 'pln' : (foreignCurrency );

  const quote_currency: Currencies =
    plnIndex === 0 ? (foreignCurrency ) : 'pln';

  const plnForeignKey = `pln_${foreignCurrency}`;

  if (!currencies[plnForeignKey]) return;

  const presentExchangeRate = currencies[plnForeignKey].present.exchange_rate;

  const exchange_rate: number =
    plnIndex === 1 ? presentExchangeRate : 1 / presentExchangeRate;

  const roundedExchangeRate = cutNumber(exchange_rate, decimalPlaces);

  const base_currency_value = cutNumber(getFloatBetweenRange(10, 10000), 0);
  const quote_currency_value = cutNumber(
    base_currency_value * roundedExchangeRate,
    decimalPlaces,
  );

  const data = {
    base_currency,
    quote_currency,
    base_currency_value,
    quote_currency_value,
    exchange_rate: roundedExchangeRate,
    user_id: 'test',
  };
  
  return await pb.collection('transaction').create(data);
};

const useCreateTransaction = (
  currencies: CurrenciesPairs | undefined,
  // eslint-disable-next-line arrow-body-style
) => {
  const [first, setFirst] = useState(true);
  return useEffect(() => {
    if (!currencies) return;
    if (first) {
      void createTransaction(currencies); //invoke, next 10 seconds later
      setFirst(false);
    }

    const interval = setInterval(() => {
      void createTransaction(currencies);
    }, Math.random() * 1000);

    return () => clearInterval(interval);
  }, [currencies, first]);
};

export default useCreateTransaction;
