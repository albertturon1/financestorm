import { Hydrate } from '@tanstack/react-query';

import { prefetchGetTodayCurrencyRatesQuery } from '@api/CurrencyRateApi';
import {
  MultiCurrenciesRate,
  PrefetchTodayCurrencyRatesRequest,
} from '@api/interfaces/ICurrencyRateApi';
import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import { CURRENCIES, DEFAULT_QUOTE_CURRENCY } from '@constants/currencies';
import CurrenciesHydrated from '@features/currencies/components/CurrenciesHydrated';
import { Currency } from '@interfaces/ICurrency';

export type CurrenciesPageProps = { currency: Currency | undefined };

const CurrenciesPage = async ({
  searchParams,
}: {
  searchParams: CurrenciesPageProps;
}) => {
  const { currency } = searchParams;
  const queryCurrencyLowerCase = currency
    ? (currency.toLowerCase() as Currency)
    : '';
  const isValidQuoteCurrency =
    !!currency && CURRENCIES.includes(queryCurrencyLowerCase);
  const quote_currency = isValidQuoteCurrency
    ? (currency.toLowerCase() as Currency)
    : DEFAULT_QUOTE_CURRENCY;
  const baseCurrencies = CURRENCIES.filter((c) => c !== quote_currency);

  const QUERY_PROPS = {
    queryParams: {
      quote_currency,
      base_currencies: baseCurrencies,
    } satisfies MultiCurrenciesRate,
    queryOptions: {
      staleTime: 1000 * 60 * 30, //30mins
    },
  } satisfies PrefetchTodayCurrencyRatesRequest;

  const hydratedState = await prefetchGetTodayCurrencyRatesQuery(QUERY_PROPS);

  return (
    <Hydrate state={hydratedState}>
      <PageMaxWidth>
        <PagePadding flex vertical className="min-h-[95.1vh]">
          <CurrenciesHydrated
            queryProps={QUERY_PROPS}
            quoteCurrency={quote_currency}
            baseCurrencies={baseCurrencies}
            isValidQuoteCurrency={isValidQuoteCurrency}
          />
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default CurrenciesPage;
