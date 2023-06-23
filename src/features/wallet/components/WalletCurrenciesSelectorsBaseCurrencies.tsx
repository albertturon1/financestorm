'use client';

import { ChangeEvent, TransitionStartFunction, useCallback } from 'react';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import FlagInput from '@components/misc/FlagInput';
import { Button } from '@components/ui/Button';
import { ScrollBar, ScrollArea } from '@components/ui/ScrollArea';
import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Currency } from '@interfaces/ICurrency';
import { WalletCurrency } from '@src/zustand/walletStore';
import { substituePotentialNaNToZero } from '@utils/misc';

import { WALLET_SELECTORS_INPUT_MAX_WIDTH } from './WalletCurrenciesSelectors';

const WalletCurrenciesSelectorsBaseCurrencies = ({
  walletBaseCurrencies,
  startCurrenciesTransition,
}: {
  walletBaseCurrencies: WalletCurrency[];
  startCurrenciesTransition: TransitionStartFunction;
}) => {
  const router = useRouter();

  const toQueryString = useModifySearchParams();

  const onInputChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement>,
      walletBaseCurrencyName: Currency,
    ) => {
      const newBaseCurrencyParam = walletBaseCurrencies
        .map((c) => {
          if (c.name !== walletBaseCurrencyName)
            return `${substituePotentialNaNToZero(c.amount)}${c.name}`;
          return `${substituePotentialNaNToZero(event.target.valueAsNumber)}${
            c.name
          }`;
        })
        .join(',');

      startCurrenciesTransition(() => {
        void router.replace(
          `/wallet?${toQueryString('base', newBaseCurrencyParam)}`,
          { forceOptimisticNavigation: true },
        );
      });
    },
    [router, startCurrenciesTransition, toQueryString, walletBaseCurrencies],
  );

  return (
    <ScrollArea
      className="flex h-[88px] max-w-max flex-col gap-y-2 overflow-hidden pr-3 tall:h-max tall:max-h-[144px]"
      type="always"
    >
      <div className="self-endlg:text-lg flex w-full flex-col justify-center gap-y-2">
        {walletBaseCurrencies.map((walletBaseCurrency) => (
          <div className="flex gap-x-1" key={walletBaseCurrency.name}>
            <div style={{ width: WALLET_SELECTORS_INPUT_MAX_WIDTH }}>
              <FlagInput
                defaultValue={walletBaseCurrency.amount}
                currency={walletBaseCurrency.name}
                onChange={(v) => onInputChange(v, walletBaseCurrency.name)}
              />
            </div>
            <Button
              variant="outline"
              className="aspect-square rounded-xl px-0"
              onClick={() => {
                const newBaseCurrencyParam = walletBaseCurrencies
                  .filter((c) => c.name !== walletBaseCurrency.name) //removed selected currency from new list of base currencies
                  .map(
                    (c) => `${substituePotentialNaNToZero(c.amount)}${c.name}`,
                  )
                  .join(',');

                void router.replace(
                  `/wallet?${toQueryString('base', newBaseCurrencyParam)}`,
                  { forceOptimisticNavigation: true },
                );
              }}
            >
              <X strokeWidth={1} size={25} />
            </Button>
          </div>
        ))}
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

export default WalletCurrenciesSelectorsBaseCurrencies;
