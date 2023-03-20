'use client';

import { useState, useEffect } from 'react';

import FlagCountryCode from '@components/FlagCountryCode';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/globals';
import MultiBaseCurrenciesLineChart from '@features/multi-currencies/components/MultiBaseCurrenciesLineChart';
import MultiCurrenciesDropdowns from '@features/multi-currencies/components/MultiCurrenciesDropdowns';
import { Currencies } from '@interfaces/ICurrency';
import { useMultiCurrenciesQuoteCurrency } from '@src/zustand/multiCurrenciesStore';

const MultiCurrenciesPage = () => {
  const [name, setName] = useState('');
  const quoteCurrency = useMultiCurrenciesQuoteCurrency();

  useEffect(() => {
    setName(quoteCurrency.name);
  }, [quoteCurrency.name]);
  return (
    <div className={`${PADDING_TAILWIND} flex flex-1 flex-col pb-4`}>
      {/*Page Header */}
      <div className="flex w-full flex-col justify-between gap-y-3 pb-1 lg:flex-row">
        <div className="flex items-center gap-x-2">
          <PageTitle>{'Kursy walut w stosunku do '}</PageTitle>
          {!!name && (
            <FlagCountryCode
              code={name as Currencies}
              className="gap-x-0"
              textClassName="text-xl"
            />
          )}
        </div>
        <MultiCurrenciesDropdowns />
      </div>
      {!!name && <MultiBaseCurrenciesLineChart />}
    </div>
  );
};

export default MultiCurrenciesPage;
