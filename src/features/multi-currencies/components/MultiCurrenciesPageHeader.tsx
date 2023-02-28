'use client';

import FlagCountryCode from '@components/FlagCountryCode';
import PageTitle from '@components/PageTitle';
import { useQuoteCurrency } from '@src/zustand/multiCurrenciesStore';

const MultiCurrenciesPageHeader = () => {
  const quoteCurrency = useQuoteCurrency();

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
