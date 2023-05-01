'use client';

import { useState, ChangeEvent } from 'react';

import { useRouter } from 'next/navigation';

import CurrenciesSelectList from '@components/misc/CurrenciesSelectList';
import { Input } from '@components/ui/Input';
import { Currency } from '@interfaces/ICurrency';
import { CurrenciesRates } from '@interfaces/models/IExchangerate';
import { useTodayCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchTodayCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';

import CurrenciesRatesTiles from './CurrenciesRatesTiles';

const CurrenciesHydrated = ({
  queryProps,
  defaultCurrency,
  baseCurrencies,
}: {
  defaultCurrency: Currency;
  baseCurrencies: Currency[];
  queryProps: PrefetchTodayCurrencyRatesRequest;
}) => {
  const router = useRouter();
  const query = useTodayCurrencyRatesQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
    },
  });

  //state to hold filtered currencies from input
  const [filteredCurrenciesRates, setFilteredCurrenciesRates] = useState(
    query.data,
  );

  const filterCurencies = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLocaleLowerCase();
    if (!query.data) return;

    const filteredRates = Object.keys(query.data.rates)
      .filter((currency) => currency.toLowerCase().includes(search))
      .sort((a, b) => {
        const aLow = a.toLowerCase();
        const bLow = b.toLowerCase();

        //prioritize by first letter from input
        if (aLow.startsWith(search[0]) && !bLow.startsWith(search[0])) {
          return -1;
        } else if (!aLow.startsWith(search[0]) && bLow.startsWith(search[0])) {
          return 1;
        } else {
          return aLow.localeCompare(bLow);
        }
      })
      .reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key]: query.data?.rates[key as Currency],
          }),
        {} as CurrenciesRates,
      );

    //return only filtered base currencies
    setFilteredCurrenciesRates({
      ...query.data,
      rates: filteredRates,
    });
  };

  const dataFrom = query.data?.date;

  return (
    <div className="flex flex-1 flex-col gap-y-6 lg:gap-y-10">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-lg font-bold sm:text-xl">
          {'Latest exchange rates'}
        </h1>
        <p className="text-sm">{dataFrom && `Data from ${dataFrom}`}</p>
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
        <div className="flex flex-col gap-y-1">
          <h1 className="pl-0.5 font-medium">{'To'}</h1>
          <CurrenciesSelectList
            currencies={baseCurrencies}
            value={defaultCurrency}
            onValueChange={(newDefaultCurrency) => {
              newDefaultCurrency === 'PLN'
                ? void router.replace(`/currencies`)
                : void router.replace(
                    `/currencies?default_currency=${newDefaultCurrency}`,
                  );
            }}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <h1 className="pl-0.5 font-medium">{'Search From'}</h1>
          <Input
            disabled={!filteredCurrenciesRates}
            onChange={filterCurencies}
          />
        </div>
      </div>
      <CurrenciesRatesTiles
        {...query}
        currenciesRates={filteredCurrenciesRates}
        quoteCurrency={defaultCurrency}
      />
    </div>
  );
};

export default CurrenciesHydrated;