import { useEffect, useMemo, useState } from 'react';

import { CURRENCIES } from '@constants/currencies';
import currenciesWithIndex, {
  IndexCurrency,
} from '@features/multi-currencies/tools/currenciesWithIndex';

export type QuoteCurrencyDataProps = {
  quoteCurrency: IndexCurrency;
};

const useQuoteCurrencyDropdownData = ({
  quoteCurrency,
}: QuoteCurrencyDataProps) => {
  const [availableQuoteCurrencies, setAvailableQuoteCurrencies] = useState<
    IndexCurrency[]
  >([]);

  useEffect(() => {
    const sortedCurrencies = currenciesWithIndex(CURRENCIES).sort((a) =>
      a.id === quoteCurrency.id ? -1 : 1,
    );
    setAvailableQuoteCurrencies(sortedCurrencies);
  }, [quoteCurrency.id]);

  const activeQuoteCurrency = useMemo(
    () => [availableQuoteCurrencies[0]],
    [availableQuoteCurrencies],
  );

  return { availableQuoteCurrencies, activeQuoteCurrency };
};

export default useQuoteCurrencyDropdownData;
