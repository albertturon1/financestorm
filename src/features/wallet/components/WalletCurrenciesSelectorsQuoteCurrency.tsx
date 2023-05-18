'use client';

import { TransitionStartFunction, useCallback, useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { CURRENCIES } from '@constants/currencies';
import { WalletCurrency } from '@src/zustand/walletStore';
import { createQueryString, substituePotentialNaNToZero } from '@utils/misc';

import WalletCurrencyInputSelect from './WalletCurrencyInputSelect';

const WalletCurrenciesSelectorsQuoteCurrency = ({
  walletBaseCurrencies,
  walletQuoteCurrency,
  startCurrenciesTransition,
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
  startCurrenciesTransition: TransitionStartFunction;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toQueryString = useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );
  const availableCurrencies = useMemo(
    () => CURRENCIES.filter((c) => c !== walletQuoteCurrency.name),
    [walletQuoteCurrency.name],
  );

  return (
    <div className="w-full pr-[59px]">
      <WalletCurrencyInputSelect
        defaultValue={walletQuoteCurrency.amount}
        currentCurrency={walletQuoteCurrency.name}
        currencies={availableCurrencies}
        onInputChange={({ target }) => {
          const newQuoteCurrencyParam = `${toQueryString(
            'quote',
            `${substituePotentialNaNToZero(target.valueAsNumber)}${
              walletQuoteCurrency.name
            }`,
          )}`;

          startCurrenciesTransition(() => {
            void router.replace(`/wallet?${newQuoteCurrencyParam}`, {
              forceOptimisticNavigation: true,
            });
          });
        }}
        onCurrencyChange={(newQuoteCurrency) => {
          //searching if newQuoteCurrency is on the list of base currencies
          const possibleBaseCurrencyFutureQuote = walletBaseCurrencies.find(
            (c) => c.name === newQuoteCurrency,
          );

          const params = new URLSearchParams(
            searchParams as unknown as URLSearchParams,
          );
          //setting new quote
          params.set(
            'quote',
            `${substituePotentialNaNToZero(
              walletQuoteCurrency.amount,
            )}${newQuoteCurrency}`,
          );

          if (possibleBaseCurrencyFutureQuote) {
            const newBaseCurrencies = walletBaseCurrencies
              .filter((c) => c.name !== newQuoteCurrency) //removal of newQuoteCurrency from baseCurrencies
              .map((c) => `${walletQuoteCurrency.amount}${c.name}`)
              .join(',');

            params.set('base', newBaseCurrencies);
            const trimParams = params.toString().replace(/%2C/g, ',');

            void router.replace(`/wallet?${trimParams}`, {
              forceOptimisticNavigation: true,
            });
          } else {
            const trimParams = params.toString().replace(/%2C/g, ',');
            void router.replace(`/wallet?${trimParams}`, {
              forceOptimisticNavigation: true,
            });
          }
        }}
      />
    </div>
  );
};

export default WalletCurrenciesSelectorsQuoteCurrency;
