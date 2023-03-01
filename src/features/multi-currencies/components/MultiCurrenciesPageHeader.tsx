'use client';

import FlagCountryCode from '@components/FlagCountryCode';
import PageTitle from '@components/PageTitle';
import { useMultiCurrenciesQuoteCurrency } from '@src/zustand/multiCurrenciesStore';

const MultiCurrenciesPageHeader = () => {
  const quoteCurrency = useMultiCurrenciesQuoteCurrency();
  return (
    <div className="flex items-center gap-x-2">
      <PageTitle>{'Kursy walut w stosunku do '}</PageTitle>
      <FlagCountryCode
        code={quoteCurrency.name}
        className="gap-x-0"
        textClassName="text-xl"
      />
    </div>
  );
};

export default MultiCurrenciesPageHeader;
