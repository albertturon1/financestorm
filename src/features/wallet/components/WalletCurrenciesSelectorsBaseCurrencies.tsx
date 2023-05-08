'use client';

import { TransitionStartFunction, useCallback } from 'react';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import FlagInput from '@components/misc/FlagInput';
import { Button } from '@components/ui/Button';
import { ScrollBar, ScrollArea } from '@components/ui/ScrollArea';
import { WalletCurrency, useWalletActions } from '@src/zustand/walletStore';
import { createQueryString, substituePotentialNaNToZero } from '@utils/misc';

const WalletCurrenciesSelectorsBaseCurrencies = ({
  walletBaseCurrencies,
  startCurrenciesTransition,
}: {
  walletBaseCurrencies: WalletCurrency[];
  startCurrenciesTransition: TransitionStartFunction;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { patchWalletBaseCurrency, deleteWalletBaseCurrency } =
    useWalletActions();

  const toQueryString = useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );

  return (
    <ScrollArea
      className="flex h-max max-h-[500px] min-h-[150px] max-w-full flex-col gap-y-2 pr-[15px]"
      type="always"
    >
      <div className="flex w-full flex-col justify-center gap-y-2 self-end lg:text-lg">
        {walletBaseCurrencies.map((walletBaseCurrency) => (
          <div className="flex gap-x-1" key={walletBaseCurrency.name}>
            <FlagInput
              className="lg:mr-1 lg:pr-4"
              defaultValue={walletBaseCurrency.amount}
              currency={walletBaseCurrency.name}
              onChange={({ target }) => {
                const newBaseCurrencyParam = walletBaseCurrencies
                  .map((c) => {
                    if (c.name !== walletBaseCurrency.name)
                      return `${substituePotentialNaNToZero(c.amount)}${
                        c.name
                      }`;
                    return `${substituePotentialNaNToZero(
                      target.valueAsNumber,
                    )}${c.name}`;
                  })
                  .join(',');

                startCurrenciesTransition(() => {
                  void router.replace(
                    `/wallet?${toQueryString('base', newBaseCurrencyParam)}`,
                    { forceOptimisticNavigation: true },
                  );

                  //PATCH
                  patchWalletBaseCurrency({
                    currency: walletBaseCurrency,
                    newValue: target.valueAsNumber,
                  });
                });
              }}
            />
            <Button
              disabled
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

                //remove baseCurrency from list
                deleteWalletBaseCurrency(walletBaseCurrency.name);
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
