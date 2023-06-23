'use client';

import { TransitionStartFunction } from 'react';

import { X } from 'lucide-react';

import FlagInput from '@components/misc/FlagInput';
import { Button } from '@components/ui/Button';
import { ScrollBar, ScrollArea } from '@components/ui/ScrollArea';
import { WalletCurrency } from '@src/zustand/walletStore';

import { WALLET_SELECTORS_INPUT_MAX_WIDTH } from './WalletCurrenciesSelectors';
import { useWalletBaseCurrenciesListMethods } from '../hooks/useWalletBaseCurrenciesListMethods';

export const WalletBaseCurrenciesList = ({
  walletBaseCurrencies,
  startCurrenciesTransition,
}: {
  walletBaseCurrencies: WalletCurrency[];
  startCurrenciesTransition: TransitionStartFunction;
}) => {
  const { onInputChange, removeCurrency } = useWalletBaseCurrenciesListMethods({
    walletBaseCurrencies,
    startCurrenciesTransition,
  });

  return (
    <ScrollArea
      className="flex min-h-[88px] max-w-max flex-col gap-y-2 overflow-hidden pr-3 tall:h-max tall:max-h-[144px]"
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
                removeCurrency(walletBaseCurrency.name);
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
