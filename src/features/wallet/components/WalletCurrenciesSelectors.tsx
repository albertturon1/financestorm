'use client';

import { X } from 'lucide-react';

import FlagInput from '@components/misc/FlagInput';
import { Button } from '@components/ui/Button';
import { ScrollBar, ScrollArea } from '@components/ui/ScrollArea';
import { WalletCurrency, useWalletActions } from '@src/zustand/walletStore';
import { substitueNaNToZero } from '@utils/misc';

import WalletQuoteCurrencyInputSelect from './WalletQuoteCurrencyInputSelect';

const WalletCurrenciesSelectors = ({
  walletBaseCurrencies,
  walletQuoteCurrency,
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
}) => {
  const {
    patchWalletQuoteCurrency,
    patchWalletBaseCurrency,
    deleteWalletQuoteCurrency,
  } = useWalletActions();
  const baseCurrenciesName = walletBaseCurrencies.map((c) => c.name);

  return (
    <div className="flex w-full max-w-[315px] pl-[15px] flex-col justify-center gap-y-2 self-center lg:text-lg">
      <h1 className="max-w-full text-center text-sm font-medium">
        {'Currencies included in the wallet'}
      </h1>
      <div className="w-full pr-[59px]">
        <WalletQuoteCurrencyInputSelect
          amount={walletQuoteCurrency.amount}
          currency={walletQuoteCurrency.name}
          onInputChange={({ target }) => {
            patchWalletQuoteCurrency({
              ...walletQuoteCurrency,
              amount: substitueNaNToZero(target.valueAsNumber),
            });
          }}
          onCurrencyChange={(newQuoteCurrency) => {
            if (baseCurrenciesName.includes(newQuoteCurrency)) {
              const currency = walletBaseCurrencies.find(
                (c) => c.name === newQuoteCurrency,
              ) as WalletCurrency;
              patchWalletQuoteCurrency(currency);
              deleteWalletQuoteCurrency(currency.name);
            } else
              patchWalletQuoteCurrency({
                name: newQuoteCurrency,
                amount: 1,
              });
          }}
        />
      </div>
      <ScrollArea
        className="flex h-[20vh] max-h-[500px] min-h-[200px] max-w-full flex-col gap-y-2 pr-[15px]"
        type="always"
      >
        <div className="flex w-full flex-col justify-center gap-y-2 self-end lg:text-lg">
          {[
            ...walletBaseCurrencies,
            ...walletBaseCurrencies,
            ...walletBaseCurrencies,
          ].map((walletCurrency) => (
            <div className="flex gap-x-1" key={walletCurrency.name}>
              <FlagInput
                className="lg:mr-1 lg:pr-4"
                amount={walletCurrency.amount}
                currency={walletCurrency.name}
                onChange={({ target }) => {
                  patchWalletBaseCurrency({
                    ...walletCurrency,
                    amount: substitueNaNToZero(target.valueAsNumber),
                  });
                }}
              />
              <Button
                variant="outline"
                className="aspect-square rounded-xl px-0"
                onClick={() => {
                  deleteWalletQuoteCurrency(walletCurrency.name);
                }}
              >
                <X strokeWidth={1} size={25} />
              </Button>
            </div>
          ))}
        </div>
        <ScrollBar />
      </ScrollArea>
    </div>
  );
};

export default WalletCurrenciesSelectors;
