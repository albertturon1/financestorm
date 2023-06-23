import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { CURRENCIES } from '@constants/currencies';
import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Currency } from '@interfaces/ICurrency';
import { WalletCurrency } from '@src/zustand/walletStore';
import { substituePotentialNaNToZero } from '@utils/misc';

type NewWalletCurrency = Omit<WalletCurrency, 'name'> & {
  name: Currency | undefined;
};

const initialState: NewWalletCurrency = {
  amount: NaN,
  name: undefined,
};

export const useWalletAddBaseCurrencyMethods = ({
  walletBaseCurrencies,
  walletQuoteCurrencyName,
}: {
  walletBaseCurrencies: WalletCurrency[];
  walletQuoteCurrencyName: Currency;
}) => {
  const [newWalletCurrency, setNewWalletCurrency] =
    useState<NewWalletCurrency>(initialState);

  const router = useRouter();
  const toQueryString = useModifySearchParams();

  const addCurrency = useCallback(() => {
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
  }, [
    newWalletCurrency.amount,
    newWalletCurrency.name,
    router,
    toQueryString,
    walletBaseCurrencies,
  ]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNewWalletCurrency((prev) => ({
      ...prev,
      amount: target.valueAsNumber,
    }));
  };

  const onCurrencyChange = (newQuoteCurrency: Currency) => {
    setNewWalletCurrency((prev) => ({
      ...prev,
      name: newQuoteCurrency,
    }));
  };

  const availableCurrencies = useMemo(() => {
    const baseCurrenciesNames = walletBaseCurrencies.map((wc) => wc.name);
    return CURRENCIES.filter(
      (c) => !baseCurrenciesNames.includes(c) && walletQuoteCurrencyName !== c,
    );
  }, [walletBaseCurrencies, walletQuoteCurrencyName]);

  return {
    addCurrency,
    newWalletCurrency,
    setNewWalletCurrency,
    onInputChange,
    onCurrencyChange,
    availableCurrencies,
  };
};
