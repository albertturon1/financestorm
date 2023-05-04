import { mergeDeepLeft } from 'ramda';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import {
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';
import currenciesWithIndex from '@features/multi-currencies/tools/currenciesWithIndex';
import { ChartTimespan } from '@interfaces/ICharts';
import { IndexCurrency } from '@interfaces/ICurrency';

export type WalletCurrency = { amount: number } & IndexCurrency;

interface Actions {
  setWalletBaseCurrencies: (value: WalletCurrency[]) => void;
  setWalletQuoteCurrency: (value: WalletCurrency) => void;
}

interface WalletStoreState {
  baseCurrencies: WalletCurrency[];
  quoteCurrency: WalletCurrency;
  actions: Actions;
  timespan: ChartTimespan;
}

const DEFAULT_AMOUNT = 100;

const DEFAULT_WALLET_BASE_CURRENCIES = currenciesWithIndex(
  DEFAULT_BASE_CURRENCIES,
).map((acc) => ({
  ...acc,
  amount: DEFAULT_AMOUNT,
})) satisfies WalletCurrency[];

const DEFAULT_WALLET_QUOTE_CURRENCY = {
  ...currenciesWithIndex([DEFAULT_QUOTE_CURRENCY])[0],
  amount: DEFAULT_AMOUNT,
} satisfies WalletCurrency;

const useWalletStore = create<WalletStoreState>()(
  persist(
    (set) => ({
      baseCurrencies: DEFAULT_WALLET_BASE_CURRENCIES,
      quoteCurrency: DEFAULT_WALLET_QUOTE_CURRENCY,
      timespan: '1Y',
      actions: {
        setWalletBaseCurrencies: (params) =>
          set(() => ({
            baseCurrencies: params,
          })),
        setWalletQuoteCurrency: (params) =>
          set(() => ({
            quoteCurrency: params,
          })),
      },
    }),
    {
      name: 'multiCurrenciesStore',
      storage: createJSONStorage(() => sessionStorage),
      merge: (persistedState, currentState) =>
        mergeDeepLeft(persistedState as object, currentState), //to prevent from rewriting actions on persist
    },
  ),
);

//client hooks
export const useWalletBaseCurrencies = () =>
  useWalletStore((state) => state.baseCurrencies, shallow);
export const useWalletBaseCurrenciesNames = () =>
  useWalletStore((state) => state.baseCurrencies.map((c) => c.name), shallow);
export const useWalletQuoteCurrency = () =>
  useWalletStore((state) => state.quoteCurrency, shallow);
export const useWalletQuoteCurrencyName = () =>
  useWalletStore((state) => state.quoteCurrency.name, shallow);
export const useWalletChartRange = () =>
  useWalletStore((state) => state.timespan);

export const useWalletActions = () => useWalletStore((state) => state.actions);

export const useWalletActionsReset = () => {
  const { setWalletBaseCurrencies, setWalletQuoteCurrency } =
    useWalletActions();
  return () => {
    setWalletBaseCurrencies(DEFAULT_WALLET_BASE_CURRENCIES);
    setWalletQuoteCurrency(DEFAULT_WALLET_QUOTE_CURRENCY);
  };
};

export default useWalletStore;
