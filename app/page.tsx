'use client';

import { useState, useEffect } from 'react';

import Loader from '@components/Loader';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/Globals';
import BaseCurrenciesCheckboxList from '@features/main/components/BaseCurrenciesCheckboxList';
import MultiBaseCurrenciesLineChart from '@features/main/components/MultiBaseCurrenciesLineChart';
import QuoteCurrencyCheckboxList from '@features/main/components/QuoteCurrencyCheckboxList';
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
        <PageTitle>{`Kursy walut w stosunku do ${quoteCurrency.name}`}</PageTitle>
        <div className="flex gap-x-10">
          <BaseCurrenciesCheckboxList />
          <QuoteCurrencyCheckboxList />
        </div>
      </div>
      <MultiBaseCurrenciesLineChart />
    </div>
  );
};

export default HomePage;
