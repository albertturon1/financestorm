'use client';

import { useMemo, useState } from 'react';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@components/ui/Button';
import { CURRENCIES } from '@constants/currencies';
import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Currency } from '@interfaces/ICurrency';
import { WalletCurrency } from '@src/zustand/walletStore';
import { substituePotentialNaNToZero } from '@utils/misc';

import WalletCurrencyInputSelect from './WalletCurrencyInputSelect';

type NewWalletCurrency = Omit<WalletCurrency, 'name'> & {
  name: Currency | undefined;
};

const initialState: NewWalletCurrency = {
  amount: NaN,
  name: undefined,
};

const WalletCurrenciesSelectorsAddCurrency = ({
  walletBaseCurrencies,
  walletQuoteCurrency,
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrency: WalletCurrency;
}) => {
  const [newWalletCurrency, setNewWalletCurrency] =
    useState<NewWalletCurrency>(initialState);
  const router = useRouter();

  const toQueryString = useModifySearchParams();
  const availableCurrencies = useMemo(() => {
    const baseCurrenciesNames = walletBaseCurrencies.map((wc) => wc.name);
    return CURRENCIES.filter(
      (c) => !baseCurrenciesNames.includes(c) && walletQuoteCurrency.name !== c,
    );
  }, [walletBaseCurrencies, walletQuoteCurrency.name]);

  const buttonEnabled =
    !isNaN(newWalletCurrency.amount) && newWalletCurrency.name;

  return (
    <div className="max-w-full pr-[15px]">
      <div className="flex gap-x-1">
        <WalletCurrencyInputSelect
          value={`${newWalletCurrency.amount}`} //template literal to prevent error "The specified value "NaN" cannot be parsed, or is out of range."
          currencies={availableCurrencies}
          currentCurrency={newWalletCurrency.name}
          onInputChange={({ target }) => {
            setNewWalletCurrency((prev) => ({
              ...prev,
              amount: target.valueAsNumber,
            }));
          }}
          onCurrencyChange={(newQuoteCurrency) => {
            setNewWalletCurrency((prev) => ({
              ...prev,
              name: newQuoteCurrency,
            }));
          }}
        />
        <Button
          disabled={!buttonEnabled}
          variant="outline"
          className="aspect-square rounded-xl px-0"
          onClick={() => {
            if (!isNaN(newWalletCurrency.amount) && newWalletCurrency.name) {
              const newBaseCurrencies = [
                {
                  name: newWalletCurrency.name,
                  amount: newWalletCurrency.amount,
                },
                ...walletBaseCurrencies,
              ];

              const newBaseCurrencyParam = newBaseCurrencies
                .map((c) => `${substituePotentialNaNToZero(c.amount)}${c.name}`)
                .join(',');

              void router.replace(
                `/wallet?${toQueryString('base', newBaseCurrencyParam)}`,
                { forceOptimisticNavigation: true },
              );

              setNewWalletCurrency(initialState); //reset to inital state
            }
          }}
        >
          <Plus strokeWidth={1} size={25} />
        </Button>
      </div>
    </div>
  );
};

export default WalletCurrenciesSelectorsAddCurrency;
