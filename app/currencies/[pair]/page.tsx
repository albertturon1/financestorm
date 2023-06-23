import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { prefetchGetDailyCurrencyRatesOverYearQuery } from '@api/CurrencyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@api/interfaces/ICurrencyRateApi';
import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import { CURRENCIES } from '@constants/currencies';
import { SERVER_DATE } from '@constants/dateTime';
import { DEFAULT_TIMESPAN, TIMESPANS } from '@constants/timespans';
import CurrenciesPairHydrated from '@features/currencies-pair/components/CurrenciesPairHydrated';
import { Timespan } from '@interfaces/ICharts';
import { Currency, CurrenciesPair } from '@interfaces/ICurrency';
import { objectKeys } from '@utils/misc';

const CurrenciesPairSelectors = dynamic(
  () => import('@features/currencies-pair/components/CurrenciesPairSelectors'),
);

export type CurrenciesPairPageProps = {
  pair: CurrenciesPair;
};

export type CurrenciesPageSearchParams = {
  timespan: Timespan | undefined;
};

const CurrenciesPairPage = async ({
  params,
  searchParams,
}: {
  params: CurrenciesPairPageProps;
  searchParams: CurrenciesPageSearchParams;
}) => {
  const { timespan: queryTimespan } = searchParams;
  const [baseCurrency, quoteCurrency] = params.pair.split('-') as [
    Currency,
    Currency,
  ];

  const isValidTimespan =
    !!queryTimespan && !!objectKeys(TIMESPANS).includes(queryTimespan);

  const timespan = isValidTimespan ? queryTimespan : DEFAULT_TIMESPAN;

  if (!CURRENCIES.includes(baseCurrency) || !CURRENCIES.includes(quoteCurrency))
    notFound();

  const QUERY_PROPS = {
    queryParams: {
      quote_currency: quoteCurrency,
      base_currencies: [baseCurrency],
      start_date: TIMESPANS[DEFAULT_TIMESPAN],
      end_date: DateTime.now().toFormat(SERVER_DATE),
    } satisfies DailyCurrencyRatesRequest,
    queryOptions: {
      staleTime: 1000 * 60 * 60 * 1, //1hour
    },
  } satisfies PrefetchDailyCurrencyRatesRequest;

  const hydratedState = await prefetchGetDailyCurrencyRatesOverYearQuery(
    QUERY_PROPS,
  );

  return (
    <Hydrate state={hydratedState}>
      <PageMaxWidth flex>
        <PagePadding vertical flex>
          <div className="flex w-full flex-1 flex-col gap-y-4 lg:gap-y-8">
            <CurrenciesPairSelectors
              baseCurrency={baseCurrency}
              quoteCurrency={quoteCurrency}
              timespan={timespan}
            />
            <CurrenciesPairHydrated
              quoteCurrency={quoteCurrency}
              baseCurrency={baseCurrency}
              queryProps={QUERY_PROPS}
              timespan={timespan}
              isValidTimespan={isValidTimespan}
            />
          </div>
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default CurrenciesPairPage;
