import { mergeDeepLeft } from 'ramda';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import {
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';
import { DEFAULT_TIMESPAN } from '@constants/timespans';
import { Timespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { substituePotentialNaNToZero } from '@utils/misc';

export type WalletCurrency = { amount: number; name: Currency };

interface Actions {
  patchWalletBaseCurrencies: (value: WalletCurrency[]) => void;
  patchWalletBaseCurrency: ({
    currency,
    newValue,
  }: {
    currency: WalletCurrency;
    newValue: number;
  }) => void;
  patchWalletQuoteCurrency: (value: WalletCurrency) => void;
  deleteWalletBaseCurrency: (currency: Currency) => void;
  patchWalletTimespan: (value: Timespan) => void;
  resetBaseCurrencies: () => void;
}

interface WalletStoreState {
  baseCurrencies: WalletCurrency[];
  quoteCurrency: WalletCurrency;
  actions: Actions;
  timespan: Timespan;
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
        patchWalletBaseCurrency: ({ currency, newValue }) =>
          set((state) => ({
            baseCurrencies: state.baseCurrencies.map((c) => {
              if (c.name !== currency.name) return c;
              return {
                ...currency,
                amount: substituePotentialNaNToZero(newValue),
              };
            }),
          })),
        deleteWalletBaseCurrency: (payload) =>
          set((state) => {
            const currencies = [...state.baseCurrencies];
            const currenciesFiltered = currencies.filter(
              (c) => c.name !== payload,
            );
            return { baseCurrencies: currenciesFiltered };
          }),
        patchWalletQuoteCurrency: (payload) =>
          set(() => ({
            quoteCurrency: payload,
          })),
        patchWalletBaseCurrencies: (payload) =>
          set(() => ({
            baseCurrencies: payload,
          })),
        patchWalletTimespan: (payload) =>
          set(() => ({
            timespan: payload,
          })),
      },
    }),
    {
      name: 'walletStore',
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
