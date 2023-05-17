import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import { prefetchGetDailyCurrencyRatesOverYearQuery } from '@api/CurrencyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@api/interfaces/ICurrencyRateApi';
import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import PageTitle from '@components/misc/PageTitle';
import {
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';
import { SERVER_DATE } from '@constants/dateTime';
import { DEFAULT_TIMESPAN, TIMESPANS } from '@constants/timespans';
import MultiCurrenciesHydrated from '@features/multi-currencies/components/MultiCurrenciesHydrated';
import MultiCurrenciesPairSelectors from '@features/multi-currencies/components/MultiCurrenciesPairSelectors';
import { Currency } from '@interfaces/ICurrency';
import { baseCurrenciesWithAmountFromQuery } from '@utils/misc';

export type MultiCurrenciesPageProps = {
  quote?: Currency;
  base?: string;
};

const MultiCurrenciesPage = async ({
  searchParams,
}: {
  searchParams: MultiCurrenciesPageProps;
}) => {
  const { quote, base } = searchParams;
  const quoteCurrency = quote ?? DEFAULT_QUOTE_CURRENCY;
  const baseCurrenciesFromString = baseCurrenciesWithAmountFromQuery(base, quoteCurrency);

  const baseCurrencies = (baseCurrenciesFromString ??
    DEFAULT_BASE_CURRENCIES) satisfies Currency[];

  const QUERY_PROPS = {
    queryParams: {
      quote_currency: quoteCurrency,
      base_currencies: baseCurrencies,
      start_date: TIMESPANS[DEFAULT_TIMESPAN],
      end_date: DateTime.now().toFormat(SERVER_DATE),
    } satisfies DailyCurrencyRatesRequest,
    queryOptions: {
      staleTime: 1000 * 60 * 30, //30minutes
    },
  } satisfies PrefetchDailyCurrencyRatesRequest;
  const hydratedState = await prefetchGetDailyCurrencyRatesOverYearQuery(QUERY_PROPS);

  return (
    <Hydrate state={hydratedState}>
      <PageMaxWidth>
        <PagePadding vertical>
          <div className="flex w-full flex-1 flex-col gap-y-6 lg:gap-y-8">
            <PageTitle
              title="Exchange rates comparisons"
              subtitle="Track currency fluctuations with exchange rate chart"
            />
            <MultiCurrenciesPairSelectors
              baseCurrencies={baseCurrencies}
              quoteCurrency={quoteCurrency}
            />
            <MultiCurrenciesHydrated
              queryProps={QUERY_PROPS}
              quoteCurrency={quoteCurrency}
              dataTimespan={DEFAULT_TIMESPAN}
            />
          </div>
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default MultiCurrenciesPage;
