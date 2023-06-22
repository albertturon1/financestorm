import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Currency } from '@interfaces/ICurrency';

export const useReplaceInvalidCurrenciesParams = ({
  isValidQuoteCurrency,
  quoteCurrency,
}: {
  isValidQuoteCurrency: boolean;
  quoteCurrency: Currency;
}) => {
  const router = useRouter();

  const toQueryString = useModifySearchParams();

  useEffect(() => {
    if (!isValidQuoteCurrency) {
      const newQuoteCurrencyParam = toQueryString('currency', quoteCurrency);

      void router.replace(`/currencies?${newQuoteCurrencyParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidQuoteCurrency, quoteCurrency, router, toQueryString]);
};
