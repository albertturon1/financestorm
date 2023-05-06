import { mergeDeepLeft } from 'ramda';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import {
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';
import { DEFAULT_TIMESPAN } from '@constants/timespans';
import { ChartTimespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';

export type WalletCurrency = { amount: number; name: Currency };

interface Actions {
  patchWalletBaseCurrency: (value: WalletCurrency) => void;
  patchWalletQuoteCurrency: (value: WalletCurrency) => void;
  setWalletTimespan: (value: ChartTimespan) => void;
  resetBaseCurrencies: () => void;
}

interface WalletStoreState {
  baseCurrencies: WalletCurrency[];
  quoteCurrency: WalletCurrency;
  actions: Actions;
  timespan: ChartTimespan;
}

const DEFAULT_AMOUNT = 100;

const DEFAULT_WALLET_BASE_CURRENCIES = DEFAULT_BASE_CURRENCIES.map((acc) => ({
  name: acc,
  amount: DEFAULT_AMOUNT,
})) satisfies WalletCurrency[];

const DEFAULT_WALLET_QUOTE_CURRENCY = {
  name: DEFAULT_QUOTE_CURRENCY,
  amount: DEFAULT_AMOUNT,
} satisfies WalletCurrency;

const useWalletStore = create<WalletStoreState>()(
  persist(
    (set) => ({
      baseCurrencies: DEFAULT_WALLET_BASE_CURRENCIES,
      quoteCurrency: DEFAULT_WALLET_QUOTE_CURRENCY,
      timespan: DEFAULT_TIMESPAN,
      actions: {
        resetBaseCurrencies: () => {
          set(() => ({ baseCurrencies: DEFAULT_WALLET_BASE_CURRENCIES }));
        },
        patchWalletBaseCurrency: (payload) =>
          set((state) => {
            const currencies = [...state.baseCurrencies]; //https://github.com/pmndrs/zustand/discussions/713
            const currencyIndex = currencies.findIndex(
              (c) => c.name === payload.name,
            );
            currencies[currencyIndex] = payload;
            return { baseCurrencies: currencies };
          }),
        patchWalletQuoteCurrency: (payload) =>
          set(() => ({
            quoteCurrency: payload,
          })),
        setWalletTimespan: (payload) =>
          set(() => ({
            timespan: payload,
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
  useWalletStore((state) => state.quoteCurrency.name);
export const useWalletTimespan = () =>
  useWalletStore((state) => state.timespan);

export const useWalletActions = () => useWalletStore((state) => state.actions);

export const useWalletReset = () => {
  const { patchWalletQuoteCurrency, resetBaseCurrencies } = useWalletActions();

  return () => {
    patchWalletQuoteCurrency(DEFAULT_WALLET_QUOTE_CURRENCY);
    resetBaseCurrencies();
  };
};

export default useWalletStore;
