'use client';

import FlagCountryCode from '@components/FlagCountryCode';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/globals';
import BaseCurrenciesCheckboxList from '@features/multi-currencies/components/BaseCurrenciesCheckboxList';
import MultiBaseCurrenciesLineChart from '@features/multi-currencies/components/MultiBaseCurrenciesLineChart';
import QuoteCurrencyCheckboxList from '@features/multi-currencies/components/QuoteCurrencyCheckboxList';
import { useQuoteCurrency } from '@src/zustand/multiCurrenciesStore';

const MultiCurrenciesPage = () => {
  const quoteCurrency = useQuoteCurrency();

  return (
    <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
      <div className="flex w-full flex-col justify-between gap-y-3 pb-1 lg:flex-row">
        <div className="flex items-center gap-x-2">
          <PageTitle>{'Kursy walut w stosunku do '}</PageTitle>
          <FlagCountryCode
            code={quoteCurrency.name}
            className="gap-x-0"
            textClassName="text-xl"
          />
        </div>
        <div className="flex gap-x-6">
          <BaseCurrenciesCheckboxList />
          <QuoteCurrencyCheckboxList />
        </div>
      </div>
      <MultiBaseCurrenciesLineChart />
    </div>
  );
};

export default MultiCurrenciesPage;
