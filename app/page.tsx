'use client';

import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/Globals';
import BaseCurrenciesCheckboxList from '@features/main/components/BaseCurrenciesCheckboxList';
import MultiBaseCurrenciesLineChart from '@features/main/components/MultiBaseCurrenciesLineChart';
import { useQuoteCurrency } from '@src/zustand/multiCurrenciesStore';

const HomePage = () => {
  const quoteCurrency = useQuoteCurrency();
  return (
    <div className="flex h-full w-full flex-col pb-6">
      <div className={`${PADDING_TAILWIND} flex items-center justify-between`}>
        {!!quoteCurrency && (
          <PageTitle>{`Kursy walut w stosunku do ${quoteCurrency.name}`}</PageTitle>
        )}
        <div className="flex gap-x-10">
          <BaseCurrenciesCheckboxList />
        </div>
      </div>
      <MultiBaseCurrenciesLineChart />
    </div>
  );
};

export default HomePage;
