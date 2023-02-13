import { mergeDeepLeft } from 'ramda';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import currenciesWithIndex, {
  IndexCurrency,
} from '@features/main/tools/currenciesWithIndex';

const defaultBaseCurrencies = currenciesWithIndex(['USD', 'GBP', 'EUR', 'CHF']);
const defaultQuoteCurrency = currenciesWithIndex(['PLN']);

interface Actions {
  setBaseCurrencies: (value: IndexCurrency[]) => void;
  setQuoteCurrency: (value: IndexCurrency) => void;
}

interface MultiBaseCurrenciesStoreState {
  baseCurrencies: IndexCurrency[];
  quoteCurrency: IndexCurrency;
  actions: Actions;
}

const useMultiCurrenciesStore = create<MultiBaseCurrenciesStoreState>()(
  persist(
    (set) => ({
      baseCurrencies: defaultBaseCurrencies,
      quoteCurrency: defaultQuoteCurrency[0],
      actions: {
        setBaseCurrencies: (params) =>
          set(() => ({
            baseCurrencies: params,
          })),
        setQuoteCurrency: (params) =>
          set(() => ({
            quoteCurrency: params,
          })),
      },
    }),
    {
      name: 'multiCurrenciesStore',
      merge: (persistedState, currentState) =>
        mergeDeepLeft(persistedState as object, currentState), //to prevent from rewriting actions on persist
    },
  ),
);

//client hooks
export const useBaseCurrencies = () =>
  useMultiCurrenciesStore((state) => state.baseCurrencies, shallow);
export const useBaseCurrenciesNames = () =>
  useMultiCurrenciesStore(
    (state) => state.baseCurrencies.map((c) => c.name),
    shallow,
  );
export const useQuoteCurrency = () =>
  useMultiCurrenciesStore((state) => state.quoteCurrency, shallow);

export const useMultiCurrenciesActions = () =>
  useMultiCurrenciesStore((state) => state.actions);

export const useMultiCurrenciesActionsReset = () => {
  const { setBaseCurrencies, setQuoteCurrency } = useMultiCurrenciesActions();
  return () => {
    setBaseCurrencies(defaultBaseCurrencies);
    setQuoteCurrency(defaultQuoteCurrency[0]);
  };
};

export default useMultiCurrenciesStore;
