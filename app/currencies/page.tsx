'use client';

import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';

import ClientScrollbars from '@components/ClientScrollbars';
import Loader from '@components/Loader';
import PageTitle from '@components/PageTitle';
import { CURRENCIES } from '@constants/currencies';
import { PADDING_TAILWIND } from '@constants/globals';
import TodayRatesQuoteCurrencyPicker from '@features/todayRates/components/TodayRatesQuoteCurrencyPicker';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateLatestResponse } from '@interfaces/models/IExchangerate';
import { useGetTodayCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { useTodayRatesQuoteCurrency } from '@src/zustand/todayCurrencyRatesStore';

const CurrenciesRatesTiles = dynamic(
  () => import('@features/currencies/compoonents/CurrenciesRatesTiles'),
);

export type CurrenciesPageProps = { currency: Currency };

const CurrenciesPage = () => {
  const [quoteCurrencyName, setQuoteCurrencyName] = useState<Currency | null>(
    null,
  );
  const quoteCurrency = useTodayRatesQuoteCurrency();
  const { data, isLoading, isError } = useGetTodayCurrencyRatesQuery({
    base_currencies: CURRENCIES,
    quote_currency: quoteCurrencyName as Currency,
  });

  useEffect(() => {
    setQuoteCurrencyName(quoteCurrency.name);
  }, [quoteCurrency.name]);

  return (
    <div className={`flex h-full w-full flex-col ${PADDING_TAILWIND}`}>
      <div className="flex w-full flex-col justify-between gap-y-3 pb-1 lg:flex-row">
        <div className="flex items-center gap-x-2">
          <PageTitle>{'Dzisiejsze kursy walut'}</PageTitle>
        </div>
        <TodayRatesQuoteCurrencyPicker />
      </div>
      <Inside
        data={data}
        quoteCurrencyName={quoteCurrencyName}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

const Inside = ({
  isLoading,
  isError,
  data,
  quoteCurrencyName,
}: {
  isLoading: boolean;
  isError: boolean;
  data: ExchangeRateLatestResponse | undefined;
  quoteCurrencyName: Currency | null;
}) => {
  if (isLoading) return <Loader />;
  if (!data || !quoteCurrencyName || isError) return <div>{'Error...'}</div>;
  return (
    <ClientScrollbars className="flex flex-1 flex-col pt-1">
      <CurrenciesRatesTiles data={data} quoteCurrencyName={quoteCurrencyName} />
    </ClientScrollbars>
  );
};

export default CurrenciesPage;
