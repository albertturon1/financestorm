'use client';

import { useMemo } from 'react';

import { ArrowLeftRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

import CurrenciesSelectList from '@components/misc/CurrenciesSelectList';
import { CURRENCIES } from '@constants/currencies';
import { Currency } from '@interfaces/ICurrency';
import Theme from '@src/Theme';

const CurrenciesPairSelectors = ({
  baseCurrency,
  quoteCurrency,
}: {
  baseCurrency: Currency;
  quoteCurrency: Currency;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const currenciesAvailable = useMemo(
    () =>
      CURRENCIES.filter(
        (currency) => currency !== quoteCurrency && currency !== baseCurrency,
      ),
    [baseCurrency, quoteCurrency],
  );

  return (
    <div className="flex w-full items-end gap-x-1 xs:gap-x-3 sm:gap-x-5 lg:gap-x-10">
      <div className="flex flex-1 flex-col gap-y-1">
        <p className="font-medium">{'From'}</p>
        <CurrenciesSelectList
          onValueChange={(newBaseCurrency) => {
            void router.push(
              `/currencies/${newBaseCurrency}-${quoteCurrency}`,
              { forceOptimisticNavigation: true },
            );
          }}
          value={baseCurrency.toUpperCase() as Currency}
          currencies={currenciesAvailable}
        />
      </div>
      <button
        onClick={() => {
          const [_, _url, pair] = pathname.split('/');
          const reversedPair = pair.split('-').reverse().join('-');
          void router.replace(`/currencies/${reversedPair}`);
        }}
        className="flex rounded-full border p-2"
      >
        <ArrowLeftRight size={20} color={Theme.colors.electric_blue} />
      </button>
      <div className="flex flex-1 flex-col gap-y-1">
        <p className="font-medium">{'To'}</p>
        <CurrenciesSelectList
          onValueChange={(newQuoteCurrency) => {
            void router.push(
              `/currencies/${baseCurrency}-${newQuoteCurrency}`,
              { forceOptimisticNavigation: true },
            );
          }}
          value={quoteCurrency.toUpperCase() as Currency}
          currencies={currenciesAvailable}
        />
      </div>
    </div>
  );
};
export default CurrenciesPairSelectors;
