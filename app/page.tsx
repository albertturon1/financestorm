import { Hydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import CurrencyRatesList from '@components/currencyRatesList';
import PageMaxWidth from '@components/misc/PageMaxWidth';
import PagePadding from '@components/misc/PagePadding';
import { SERVER_DATE } from '@constants/dateTime';
import { Currency } from '@interfaces/ICurrency';
import { prefetchDailyCurrencyRatesQuery } from '@src/api/CurrenctyRateApi';
import {
  DailyCurrencyRatesRequest,
  PrefetchDailyCurrencyRatesRequest,
} from '@src/api/interfaces/ICurrenctyRateApi';

const HOMEPAGE_CHART_DAYS_BACK = 30;
const QUOTE_CURRENCY = 'PLN' as Currency;
const BASE_CURRENCIES = ['USD', 'EUR', 'GBP', 'CHF'] satisfies Currency[];
const QUERY_PROPS = {
  queryParams: {
    quote_currency: QUOTE_CURRENCY,
    base_currencies: BASE_CURRENCIES,
    start_date: DateTime.now()
      .minus({ days: HOMEPAGE_CHART_DAYS_BACK - 1 })
      .toFormat(SERVER_DATE),
    end_date: DateTime.now().toFormat(SERVER_DATE),
  } satisfies DailyCurrencyRatesRequest,
  queryOptions: {
    staleTime: 1000 * 60 * 60 * 24, //24hours
  },
} satisfies PrefetchDailyCurrencyRatesRequest;

const HomePage = async () => {
  const hydratedState = await prefetchDailyCurrencyRatesQuery(QUERY_PROPS);

  return (
    <Hydrate state={hydratedState}>
      <PageMaxWidth>
        <PagePadding vertical horizontal={false}>
          <CurrencyRatesList showGoToAllButton queryProps={QUERY_PROPS} />
        </PagePadding>
      </PageMaxWidth>
    </Hydrate>
  );
};

export default HomePage;
