import { useEffect, useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { WalletCurrency } from '@src/zustand/walletStore';
import { createQueryString, substituePotentialNaNToZero } from '@utils/misc';

const useReplaceInvalidQuoteCurrency = ({
  isValidQuoteCurrency,
  walletQuoteCurrency,
}: {
  walletQuoteCurrency: WalletCurrency;
  isValidQuoteCurrency: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toQueryString = useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );

  return useEffect(() => {
    if (!isValidQuoteCurrency) {
      const newQuoteCurrencyParam = `${toQueryString(
        'quote',
        `${substituePotentialNaNToZero(walletQuoteCurrency.amount)}${
          walletQuoteCurrency.name
        }`,
      )}`;

      void router.replace(`/wallet?${newQuoteCurrencyParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [
    isValidQuoteCurrency,
    walletQuoteCurrency.amount,
    walletQuoteCurrency.name,
    router,
    toQueryString,
  ]);
};

export default useReplaceInvalidQuoteCurrency;
