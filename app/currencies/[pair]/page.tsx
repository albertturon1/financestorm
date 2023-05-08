import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import { SERVER_DATE } from '@constants/dateTime';
import { DEFAULT_TIMESPAN, TIMESPANS } from '@constants/timespans';
import CurrenciesPairHydrated from '@features/currencies-pair/components/CurrenciesPairHydrated';
import { Currency, CurrenciesPair } from '@interfaces/ICurrency';
import { prefetchDailyCurrencyRatesOverYearQuery } from '@src/api/CurrencyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@src/api/interfaces/ICurrencyRateApi';

const CurrenciesPairSelectors = dynamic(
  () => import('@features/currencies-pair/components/CurrenciesPairSelectors'),
);

export type CurrenciesPairPageProps = {
  pair: CurrenciesPair;
};

const CurrenciesPairPage = async ({
  params,
}: {
  params: CurrenciesPairPageProps;
}) => {
  const [baseCurrency, quoteCurrency] = params.pair.split('-') as [
    Currency,
    Currency,
  ];

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

  const hydratedState = await prefetchDailyCurrencyRatesOverYearQuery(
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
            />
          <CurrenciesPairHydrated
              quoteCurrency={quoteCurrency}
              baseCurrency={baseCurrency}
              defaultChartTimespan={DEFAULT_TIMESPAN}
              queryProps={QUERY_PROPS}
            />
          </div>
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default CurrenciesPairPage;
