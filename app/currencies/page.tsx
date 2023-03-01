'use client';

import { use } from 'react';

import FlagCountryCode from '@components/FlagCountryCode';
import PageTitle from '@components/PageTitle';
import { CURRENCIES } from '@constants/Currencies';
import { PADDING_TAILWIND } from '@constants/Globals';
import CurrencyTile from '@features/currencies/compoonents/CurrencyTile';
import TodayRatesQuoteCurrencyPicker from '@features/todayRates/components/TodayRatesQuoteCurrencyPicker';
import { Currencies } from '@interfaces/ICurrency';
import { useTodayRatesQuoteCurrency } from '@src/zustand/todayCurrencyRatesStore';
import queryClientSide from '@utils/queryClientSide';

import { getTodayCurrencyRatesQuery } from '../../src/api/CurrenctyRateApi';

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
      <div className="grid auto-cols-max grid-cols-1 gap-5 pt-5 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Object.entries(data.rates).map(([baseCurrency, rate]) => (
          <CurrencyTile
            currenciesPair={`${baseCurrency as Currencies}-${
              quoteCurrency.name
            }`}
            rate={rate}
            key={baseCurrency}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrenciesPage;
