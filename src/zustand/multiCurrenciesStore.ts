import { mergeDeepLeft } from 'ramda';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import { CHART_RANGES } from '@constants/Chart';
import currenciesWithIndex, {
  IndexCurrency,
} from '@features/multi-currencies/tools/currenciesWithIndex';
import { ChartRange } from '@interfaces/ICharts';

const defaultBaseCurrencies = currenciesWithIndex(['USD', 'GBP', 'EUR', 'CHF']);
const defaultQuoteCurrency = currenciesWithIndex(['PLN']);

interface Actions {
  setMultiCurrenciesBaseCurrencies: (value: IndexCurrency[]) => void;
  setMultiCurrenciesQuoteCurrency: (value: IndexCurrency) => void;
  setMultiCurrenciesChartRange: (value: ChartRange) => void;
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
        setMultiCurrenciesBaseCurrencies: (params) =>
          set(() => ({
            baseCurrencies: params,
          })),
        setMultiCurrenciesQuoteCurrency: (params) =>
          set(() => ({
            quoteCurrency: params,
          })),
        setMultiCurrenciesChartRange: (params) =>
          set(() => ({
            mutliChartRange: params,
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
export const useMultiCurrenciesBaseCurrencies = () =>
  useMultiCurrenciesStore((state) => state.baseCurrencies, shallow);
export const useMultiCurrenciesBaseCurrenciesNames = () =>
  useMultiCurrenciesStore(
    (state) => state.baseCurrencies.map((c) => c.name),
    shallow,
  );
export const useMultiCurrenciesQuoteCurrency = () =>
  useMultiCurrenciesStore((state) => state.quoteCurrency, shallow);
export const useMultiCurrenciesChartRange = () =>
  useMultiCurrenciesStore((state) => state.mutliChartRange);

export const useMultiCurrenciesActions = () =>
  useMultiCurrenciesStore((state) => state.actions);

export const useMultiCurrenciesActionsReset = () => {
  const { setMultiCurrenciesBaseCurrencies, setMultiCurrenciesQuoteCurrency } =
    useMultiCurrenciesActions();
  return () => {
    setMultiCurrenciesBaseCurrencies(defaultBaseCurrencies);
    setMultiCurrenciesQuoteCurrency(defaultQuoteCurrency[0]);
  };
};

export default useMultiCurrenciesStore;
