'use client';

import { use, useState, useEffect } from 'react';

import dynamic from 'next/dynamic';

import PageTitle from '@components/PageTitle';
import { CURRENCIES } from '@constants/currencies';
import { PADDING_TAILWIND } from '@constants/globals';
import TodayRatesQuoteCurrencyPicker from '@features/todayRates/components/TodayRatesQuoteCurrencyPicker';
import { Currencies } from '@interfaces/ICurrency';
import { useTodayRatesQuoteCurrency } from '@src/zustand/todayCurrencyRatesStore';
import queryClientSide from '@utils/queryClientSide';

import { getTodayCurrencyRatesQuery } from '../../src/api/CurrenctyRateApi';

const CurrenciesRatesTiles = dynamic(
  () => import('@features/currencies/compoonents/CurrenciesRatesTiles'),
);

export type CurrenciesPageProps = { currency: Currencies };

const CurrenciesPage = () => {
  const [quoteCurrencyName, setQuoteCurrencyName] = useState<Currencies | null>(
    null,
  );
  const quoteCurrency = useTodayRatesQuoteCurrency();
  const data =
    !!quoteCurrencyName &&
    use(
      queryClientSide([quoteCurrency.id], () =>
        getTodayCurrencyRatesQuery({
          base_currencies: CURRENCIES,
          quote_currency: quoteCurrencyName,
        }),
      ),
    );

  useEffect(() => {
    setQuoteCurrencyName(quoteCurrency.name);
  }, [quoteCurrency.name]);

  return (
    <div className={`h-full w-full ${PADDING_TAILWIND}`}>
      <div className="flex w-full flex-col justify-between gap-y-3 pb-1 lg:flex-row">
        <div className="flex items-center gap-x-2">
          <PageTitle>{'Dzisiejsze kursy walut'}</PageTitle>
        </div>
        <TodayRatesQuoteCurrencyPicker />
      </div>
      {!!data && !!quoteCurrencyName && (
        <CurrenciesRatesTiles
          data={data}
          quoteCurrencyName={quoteCurrencyName}
        />
      )}
    </div>
  );
};

export default CurrenciesPage;
