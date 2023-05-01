import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import PageTitle from '@components/misc/PageTitle';
import { CHART_TIMESPANS } from '@constants/chart';
import { SERVER_DATE } from '@constants/dateTime';
import MultiCurrenciesHydrated from '@features/multi-currencies/components/MultiCurrenciesHydrated';
import MultiCurrenciesPairSelectors from '@features/multi-currencies/components/MultiCurrenciesPairSelectors';
import { ChartTimespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { prefetchDailyCurrencyRatesQuery } from '@src/api/CurrencyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@src/api/interfaces/ICurrencyRateApi';

const DATA_TIMESPAN = '1Y' satisfies ChartTimespan;
const DEFAULT_QUOTE_CURRENCY = 'PLN' satisfies Currency;
const DEFAULT_BASE_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'CHF',
] satisfies Currency[];

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
  const quoteCurrency = (quote ?? DEFAULT_QUOTE_CURRENCY) satisfies Currency;
  const baseCurrenciesFromString =
    base && base.length > 0
      ? (base
          .split(',')
          .filter((c) => c !== quoteCurrency) //remove quote currency from results
          .map((c) => c.trim()) as Currency[])
      : undefined;

  const baseCurrencies = (baseCurrenciesFromString ??
    DEFAULT_BASE_CURRENCIES) satisfies Currency[];

  const QUERY_PROPS = {
    queryParams: {
      quote_currency: quoteCurrency,
      base_currencies: baseCurrencies,
      start_date: CHART_TIMESPANS[DATA_TIMESPAN],
      end_date: DateTime.now().toFormat(SERVER_DATE),
    } satisfies DailyCurrencyRatesRequest,
    queryOptions: {
      staleTime: 1000 * 60 * 30, //30minutes
    },
  } satisfies PrefetchDailyCurrencyRatesRequest;
  const hydratedState = await prefetchDailyCurrencyRatesQuery(QUERY_PROPS);

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
              dataTimespan={DATA_TIMESPAN}
            />
          </div>
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default MultiCurrenciesPage;
