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

export type CurrenciesPageProps = { default_currency?: Currency };

const CurrenciesPage = async ({
  searchParams,
}: {
  searchParams: CurrenciesPageProps;
}) => {
  const defaultQuoteCurrency =
    searchParams.default_currency ?? DEFAULT_QUOTE_CURRENCY;
  const baseCurrencies = CURRENCIES.filter((c) => c !== defaultQuoteCurrency);

  const QUERY_PROPS = {
    queryParams: {
      quote_currency: defaultQuoteCurrency,
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
        <PagePadding flex vertical>
          <CurrenciesHydrated
            queryProps={QUERY_PROPS}
            defaultCurrency={defaultQuoteCurrency}
            baseCurrencies={baseCurrencies}
          />
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default CurrenciesPage;
