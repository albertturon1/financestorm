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
  CURRENCIES,
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';
import { SERVER_DATE } from '@constants/dateTime';
import { DEFAULT_TIMESPAN, TIMESPANS } from '@constants/timespans';
import MultiCurrenciesHydrated from '@features/multi-currencies/components/MultiCurrenciesHydrated';
import MultiCurrenciesPairSelectors from '@features/multi-currencies/components/MultiCurrenciesPairSelectors';
import { Timespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { baseCurrenciesFromCommaString } from '@utils/misc';

export type MultiCurrenciesPageProps = {
  quote?: Currency;
  base?: string;
  timespan?: Timespan;
};

const MultiCurrenciesPage = async ({
  searchParams,
}: {
  searchParams: MultiCurrenciesPageProps;
}) => {
  const { quote, base, timespan: queryTimespan } = searchParams;

  const isValidQuoteCurrencyFromParams =
    !!quote && CURRENCIES.includes(quote.toLocaleLowerCase());

  const quoteCurrency = isValidQuoteCurrencyFromParams
    ? quote
    : DEFAULT_QUOTE_CURRENCY;

  const validBaseCurrenciesFromString = baseCurrenciesFromCommaString(
    base,
    quoteCurrency,
  ).filter(
    (currency) =>
      CURRENCIES.includes(currency.toLowerCase()) && currency !== quoteCurrency,
  );

  const isValidBaseCurrenciesFromParams =
    !!validBaseCurrenciesFromString.length;

  const baseCurrencies = (
    isValidBaseCurrenciesFromParams
      ? validBaseCurrenciesFromString
      : DEFAULT_BASE_CURRENCIES
  ) satisfies Currency[];

  const isValidTimespan =
    !!queryTimespan && !!Object.keys(TIMESPANS).includes(queryTimespan);
  const timespan = isValidTimespan ? queryTimespan : DEFAULT_TIMESPAN;

  const QUERY_PROPS = {
    queryParams: {
      quote_currency: quoteCurrency,
      base_currencies: baseCurrencies,
      start_date: TIMESPANS[timespan],
      end_date: DateTime.now().toFormat(SERVER_DATE),
    } satisfies DailyCurrencyRatesRequest,
    queryOptions: {
      staleTime: 1000 * 60 * 30, //30minutes
    },
  } satisfies PrefetchDailyCurrencyRatesRequest;

  const hydratedState = await prefetchGetDailyCurrencyRatesOverYearQuery(
    QUERY_PROPS,
  );

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
              isValidQuoteCurrencyFromParams={isValidQuoteCurrencyFromParams}
              isValidBaseCurrenciesFromParams={isValidBaseCurrenciesFromParams}
              timespan={timespan}
              isValidTimespan={isValidTimespan}
            />
          </div>
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default MultiCurrenciesPage;
