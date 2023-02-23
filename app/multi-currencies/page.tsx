'use client';

import { useState, useEffect } from 'react';

import FlagCountryCode from '@components/FlagCountryCode';
import Loader from '@components/Loader';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/Globals';
import BaseCurrenciesCheckboxList from '@features/multi-currencies/components/BaseCurrenciesCheckboxList';
import MultiBaseCurrenciesLineChart from '@features/multi-currencies/components/MultiBaseCurrenciesLineChart';
import QuoteCurrencyCheckboxList from '@features/multi-currencies/components/QuoteCurrencyCheckboxList';
import { useQuoteCurrency } from '@src/zustand/multiCurrenciesStore';

const HomePage = () => {
  const quoteCurrency = useQuoteCurrency();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loader />;

  return (
    <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
      <div className="flex w-full justify-between pb-1">
        <div className="flex items-center gap-x-2">
          <PageTitle>{'Kursy walut w stosunku do '}</PageTitle>
          <FlagCountryCode
            code={quoteCurrency.name}
            className="gap-x-0"
            textClassName="text-xl"
          />
        </div>
        <div className="flex gap-x-10">
          {/*<MultiCurrenciesChartRange />*/}
          <BaseCurrenciesCheckboxList />
          <QuoteCurrencyCheckboxList />
        </div>
      </div>
      <MultiBaseCurrenciesLineChart />
    </div>
  );
};

export default HomePage;
