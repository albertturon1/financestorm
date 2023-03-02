'use client';

import { use } from 'react';

import dynamic from 'next/dynamic';

import FlagCountryCode from '@components/FlagCountryCode';
import PageTitle from '@components/PageTitle';
import { CURRENCIES } from '@constants/Currencies';
import { PADDING_TAILWIND } from '@constants/Globals';
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
  const quoteCurrency = useTodayRatesQuoteCurrency();
  const data = use(
    queryClientSide([quoteCurrency.id], () =>
      getTodayCurrencyRatesQuery({
        base_currencies: CURRENCIES,
        quote_currency: quoteCurrency.name,
      }),
    ),
  );

  return (
    <div className={`h-full w-full ${PADDING_TAILWIND}`}>
      <div className="flex w-full flex-col justify-between gap-y-3 pb-1 lg:flex-row">
        <div className="flex items-center gap-x-2">
          <PageTitle>{'Dzisiejsze kursy walut w stosunku do'}</PageTitle>
          <FlagCountryCode
            code={quoteCurrency.name}
            className="gap-x-0"
            textClassName="text-xl"
          />
        </div>
        <TodayRatesQuoteCurrencyPicker />
      </div>
      <CurrenciesRatesTiles
        data={data}
        quoteCurrencyName={quoteCurrency.name}
      />
    </div>
  );
};

export default CurrenciesPage;
