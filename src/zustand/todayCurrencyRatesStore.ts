import { mergeDeepLeft } from 'ramda';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import currenciesWithIndex, {
  IndexCurrency,
} from '@features/multi-currencies/tools/currenciesWithIndex';

const defaultQuoteCurrency = currenciesWithIndex(['PLN']);

interface Actions {
  setTodayRatesQuoteCurrency: (value: IndexCurrency) => void;
}

interface TodayCurrencyRatesStoreState {
  quoteCurrency: IndexCurrency;
  actions: Actions;
}

const useTodayCurrencyRatesStore = create<TodayCurrencyRatesStoreState>()(
  persist(
    (set) => ({
      quoteCurrency: defaultQuoteCurrency[0],
      actions: {
        setTodayRatesQuoteCurrency: (params) =>
          set(() => ({
            quoteCurrency: params,
          })),
      },
    }),
    {
      name: 'todayCurrencyRatesStore',
      storage: createJSONStorage(() => sessionStorage),
      merge: (persistedState, currentState) =>
        mergeDeepLeft(persistedState as object, currentState), //to prevent from rewriting actions on persist
    },
  ),
);

//client hooks
export const useTodayRatesQuoteCurrency = () =>
  useTodayCurrencyRatesStore((state) => state.quoteCurrency, shallow);

export const useTodayCurrencyRatesActions = () =>
  useTodayCurrencyRatesStore((state) => state.actions);

export const useMultiCurrenciesActionsReset = () => {
  const { setTodayRatesQuoteCurrency } = useTodayCurrencyRatesActions();
  return () => {
    setTodayRatesQuoteCurrency(defaultQuoteCurrency[0]);
  };
};

export default useTodayCurrencyRatesStore;
