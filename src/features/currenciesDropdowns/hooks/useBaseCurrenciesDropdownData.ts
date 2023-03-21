import { useEffect, useState } from 'react';

import { CURRENCIES } from '@constants/currencies';
import currenciesWithIndex, {
  IndexCurrency,
} from '@features/multi-currencies/tools/currenciesWithIndex';

export type BaseCurrenciesDataProps = {
  quoteCurrency: IndexCurrency;
  baseCurrencies: IndexCurrency[];
};

const useBaseCurrenciesDropdownData = ({
  quoteCurrency,
  baseCurrencies,
}: BaseCurrenciesDataProps) => {
  const [availableBaseCurrencies, setAvailableBaseCurrencies] = useState<
    IndexCurrency[]
  >([]);

  //useState to prevent hydration error on render
  const [baseCurrenciesLength, setBaseCurrenciesLength] = useState<
    number | null
  >(null);

  useEffect(() => {
    setBaseCurrenciesLength(baseCurrencies.length);
  }, [baseCurrencies.length]);

  useEffect(() => {
    const baseCurrenciesNames = baseCurrencies.map((c) => c.name);
    const nonQuoteCurreciesList = currenciesWithIndex(
      CURRENCIES.filter(
        (name) =>
          name !== quoteCurrency?.name && !baseCurrenciesNames.includes(name),
      ),
    );
    setAvailableBaseCurrencies(baseCurrencies.concat(nonQuoteCurreciesList));
  }, [baseCurrencies, quoteCurrency?.name]);

  return { availableBaseCurrencies, baseCurrenciesLength };
};

export default useBaseCurrenciesDropdownData;
