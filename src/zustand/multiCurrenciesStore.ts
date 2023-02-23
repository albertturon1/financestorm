import { mergeDeepLeft } from 'ramda';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import { CHART_RANGES } from '@constants/chartRange';
import currenciesWithIndex, {
  IndexCurrency,
} from '@features/multi-currencies/tools/currenciesWithIndex';
import { ChartRange } from '@interfaces/ICharts';

const defaultBaseCurrencies = currenciesWithIndex(['USD', 'GBP', 'EUR', 'CHF']);
const defaultQuoteCurrency = currenciesWithIndex(['PLN']);

interface Actions {
  setBaseCurrencies: (value: IndexCurrency[]) => void;
  setQuoteCurrency: (value: IndexCurrency) => void;
  setMutliChartRange: (value: ChartRange) => void;
}

interface MultiBaseCurrenciesStoreState {
  baseCurrencies: IndexCurrency[];
  quoteCurrency: IndexCurrency;
  actions: Actions;
  mutliChartRange: ChartRange;
}

const useMultiCurrenciesStore = create<MultiBaseCurrenciesStoreState>()(
  persist(
    (set) => ({
      baseCurrencies: defaultBaseCurrencies,
      quoteCurrency: defaultQuoteCurrency[0],
      mutliChartRange: CHART_RANGES[0],
      actions: {
        setBaseCurrencies: (params) =>
          set(() => ({
            baseCurrencies: params,
          })),
        setQuoteCurrency: (params) =>
          set(() => ({
            quoteCurrency: params,
          })),
        setMutliChartRange: (params) =>
          set(() => ({
            mutliChartRange: params,
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
export const useMutliChartRange = () =>
  useMultiCurrenciesStore((state) => state.mutliChartRange);

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
