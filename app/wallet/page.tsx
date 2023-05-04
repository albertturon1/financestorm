import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import PageTitle from '@components/misc/PageTitle';
import { CHART_TIMESPANS } from '@constants/chart';
import {
  DEFAULT_BASE_CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
} from '@constants/currencies';
import { SERVER_DATE } from '@constants/dateTime';
import WalletHydrated from '@features/wallet/components/WalletHydrated';
import { ChartTimespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { prefetchDailyCurrencyRatesQuery } from '@src/api/CurrencyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@src/api/interfaces/ICurrencyRateApi';
import { baseCurrenciesFromQuery } from '@utils/misc';

const DATA_TIMESPAN = '1Y' satisfies ChartTimespan;

export type WalletPageProps = {
  quote?: Currency;
  base?: string;
};

const WalletPage = async ({
  searchParams,
}: {
  searchParams: WalletPageProps;
}) => {
  const { quote, base } = searchParams;
  const quoteCurrency = quote ?? DEFAULT_QUOTE_CURRENCY;
  const baseCurrenciesFromString = baseCurrenciesFromQuery(base, quoteCurrency);

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
              title="Multicurrency wallet"
              subtitle="Track wallet value fluctuations with multicurrency wallet data"
            />
            <WalletHydrated
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

export default WalletPage;
