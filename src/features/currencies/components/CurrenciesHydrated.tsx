'use client';

import { useState, ChangeEvent } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { useTodayCurrencyRatesQuery } from '@api/client/CurrenctyRateClientApi';
import { PrefetchTodayCurrencyRatesRequest } from '@api/interfaces/ICurrencyRateApi';
import CurrenciesSelectList from '@components/misc/CurrenciesSelectList';
import { LabelOverSelectInput } from '@components/misc/LabelOverSelectInput';
import PageTitle from '@components/misc/PageTitle';
import { Input } from '@components/ui/Input';
import SkeletonLoader from '@components/ui/SkeletonLoader';
import { CURRENCIES, DEFAULT_QUOTE_CURRENCY } from '@constants/currencies';
import { Currency } from '@interfaces/ICurrency';
import { CurrenciesRates } from '@interfaces/models/IExchangerate';

import { useReplaceInvalidCurrenciesParams } from '../hooks/useReplaceInvalidCurrenciesParams';

const CurrenciesRatesTiles = dynamic(() => import('./CurrenciesRatesTiles'), {
  ssr: false,
  loading: () => (
    <div className="grid w-full auto-cols-max grid-cols-1 gap-y-[2px] sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
      {Array.from({ length: CURRENCIES.length - 1 }, (_, i) => (
        <SkeletonLoader
          key={i}
          className="h-14 w-full rounded-lg"
          style={{ animationDelay: `${i * 0.05}s`, animationDuration: '1s' }}
        />
      ))}
    </div>
  ),
});

const CurrenciesHydrated = ({
  queryProps,
  quoteCurrency,
  baseCurrencies,
  isValidQuoteCurrency,
}: {
  quoteCurrency: Currency;
  baseCurrencies: Currency[];
  queryProps: PrefetchTodayCurrencyRatesRequest;
  isValidQuoteCurrency: boolean;
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
    const search = e.target.value;
    if (!query.data) return;

    const filteredRates = Object.keys(query.data.rates)
      .filter((currency) => currency.includes(search))
      .sort((a, b) => {
        //prioritize by first letter from input
        if (a.startsWith(search[0]) && !b.startsWith(search[0])) {
          return -1;
        } else if (!a.startsWith(search[0]) && b.startsWith(search[0])) {
          return 1;
        } else {
          return a.localeCompare(b);
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

  useReplaceInvalidCurrenciesParams({
    quoteCurrency,
    isValidQuoteCurrency,
  });
  return (
    <div className="flex flex-1 flex-col gap-y-6 lg:gap-y-10">
      <PageTitle
        title="Latest exchange rates"
        subtitle={dataFrom && `Data from ${dataFrom}`}
      />
      <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
        <div className="flex flex-col gap-y-1">
          <LabelOverSelectInput>{'Quote currency'}</LabelOverSelectInput>
          <CurrenciesSelectList
            currencies={baseCurrencies}
            value={quoteCurrency}
            onValueChange={(newDefaultCurrency) => {
              //TODO: fix
              newDefaultCurrency === DEFAULT_QUOTE_CURRENCY
                ? void router.push(`/currencies`, {
                    forceOptimisticNavigation: true,
                  })
                : void router.push(
                    `/currencies?currency=${newDefaultCurrency}`,
                    { forceOptimisticNavigation: true },
                  );
            }}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <LabelOverSelectInput>{'Search base currency'}</LabelOverSelectInput>
          <Input
            disabled={!filteredCurrenciesRates}
            onChange={filterCurencies}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 pl-0.5">
        <LabelOverSelectInput>{'From'}</LabelOverSelectInput>
        <CurrenciesRatesTiles
          {...query}
          currenciesRates={filteredCurrenciesRates}
          quoteCurrency={quoteCurrency}
        />
      </div>
    </div>
  );
};

export default CurrenciesHydrated;
