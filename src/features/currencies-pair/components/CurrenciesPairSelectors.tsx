'use client';

import { useMemo } from 'react';

import { ArrowLeftRight } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

import CurrenciesSelectList from '@components/misc/CurrenciesSelectList';
import { LabelOverSelectInput } from '@components/misc/LabelOverSelectInput';
import { CURRENCIES } from '@constants/currencies';
import { Timespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import Theme from '@src/Theme';

const CurrenciesPairSelectors = ({
  baseCurrency,
  quoteCurrency,
  timespan,
}: {
  baseCurrency: Currency;
  quoteCurrency: Currency;
  timespan: Timespan;
}) => {
  const router = useRouter();
  const params = useParams();

  const currenciesAvailable = useMemo(
    () =>
      CURRENCIES.filter(
        (currency) => currency !== quoteCurrency && currency !== baseCurrency,
      ),
    [baseCurrency, quoteCurrency],
  );
  const reversedPair = params.pair?.split('-').reverse().join('-');

  return (
    <div className="flex w-full items-end gap-x-1 xs:gap-x-3 sm:gap-x-5 lg:gap-x-10">
      <div className="flex flex-1 flex-col gap-y-1">
        <LabelOverSelectInput>{'From'}</LabelOverSelectInput>
        <CurrenciesSelectList
          onValueChange={(newBaseCurrency) => {
            const pair = `${newBaseCurrency}-${quoteCurrency}`;

            void router.push(`/currencies/${pair}?timespan=${timespan}`, {
              forceOptimisticNavigation: true,
            });
          }}
          value={baseCurrency}
          currencies={currenciesAvailable}
        />
      </div>
      <button
        onClick={() => {
          void router.replace(
            `/currencies/${reversedPair}?timespan=${timespan}`,
            {
              forceOptimisticNavigation: true,
            },
          );
        }}
        className="flex rounded-full border p-2"
      >
        <ArrowLeftRight size={20} color={Theme.colors.electric_blue} />
      </button>
      <div className="flex flex-1 flex-col gap-y-1">
        <LabelOverSelectInput>{'To'}</LabelOverSelectInput>
        <CurrenciesSelectList
          onValueChange={(newQuoteCurrency) => {
            const pair = `${baseCurrency}-${newQuoteCurrency}`;

            void router.push(`/currencies/${pair}?timespan=${timespan}`, {
              forceOptimisticNavigation: true,
            });
          }}
          value={quoteCurrency}
          currencies={currenciesAvailable}
        />
      </div>
    </div>
  );
};
export default CurrenciesPairSelectors;
