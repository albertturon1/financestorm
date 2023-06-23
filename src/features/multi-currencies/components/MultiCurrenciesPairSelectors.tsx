'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import CurrenciesSelectList from '@components/misc/CurrenciesSelectList';
import { LabelOverSelectInput } from '@components/misc/LabelOverSelectInput';
import MultiCurrenciesSelectList from '@components/misc/MultiCurrenciesSelectList';
import { CURRENCIES } from '@constants/currencies';
import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Currency } from '@interfaces/ICurrency';

const MultiCurrenciesPairSelectors = ({
  baseCurrencies,
  quoteCurrency,
}: {
  baseCurrencies: Currency[];
  quoteCurrency: Currency;
}) => {
  const router = useRouter();

  const baseCurrenciesAvailable = useMemo(
    () => CURRENCIES.filter((currency) => currency !== quoteCurrency),
    [quoteCurrency],
  );
  const quoteCurrenciesAvailable = useMemo(
    () => CURRENCIES.filter((currency) => currency !== quoteCurrency),
    [quoteCurrency],
  );

  const toQueryString = useModifySearchParams();

  return (
    <div className="flex w-full items-end gap-x-1 xs:gap-x-3 sm:gap-x-5 lg:gap-x-10">
      <div className="flex flex-1 flex-col gap-y-1">
        <LabelOverSelectInput>{'From'}</LabelOverSelectInput>
        <MultiCurrenciesSelectList
          onValueChange={(baseCurrency) => {
            //remove from params list
            if (baseCurrencies.includes(baseCurrency))
              void router.push(
                `/multi-currencies?${toQueryString(
                  'base',
                  baseCurrencies.filter((c) => c !== baseCurrency).join(','),
                )}`,
                { forceOptimisticNavigation: true },
              );
            else
              void router.push(
                `/multi-currencies?${toQueryString(
                  'base',
                  [baseCurrencies, baseCurrency].sort().join(','),
                )}`,
                { forceOptimisticNavigation: true },
              );
          }}
          values={baseCurrencies}
          currencies={baseCurrenciesAvailable}
          selectedCurrencies={baseCurrencies}
        />
      </div>
      <div className="flex flex-1 flex-col gap-y-1">
        <LabelOverSelectInput>{'To'}</LabelOverSelectInput>
        <CurrenciesSelectList
          onValueChange={(newQuoteCurrency) => {
            //when new quote currency has already been on the list of base currencies
            if (baseCurrencies.includes(newQuoteCurrency))
              void router.push(
                `/multi-currencies?quote=${newQuoteCurrency}&base=${baseCurrencies
                  .filter((c) => c !== newQuoteCurrency)
                  .join(',')}`,
                { forceOptimisticNavigation: true },
              );
            else
              void router.push(
                `/multi-currencies?${toQueryString('quote', newQuoteCurrency)}`,
                { forceOptimisticNavigation: true },
              );
          }}
          value={quoteCurrency}
          currencies={quoteCurrenciesAvailable}
        />
      </div>
    </div>
  );
};

export default MultiCurrenciesPairSelectors;
