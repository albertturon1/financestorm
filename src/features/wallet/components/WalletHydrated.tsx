'use client';

import { useMemo, useTransition, useState, useEffect } from 'react';

import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { useDailyCurrencyRatesOverYearQuery } from '@api/client/CurrenctyRateClientApi';
import { useMonthlyCPIQuery } from '@api/client/OECDClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@api/interfaces/ICurrencyRateApi';
import TimespanPickerLoader from '@components/timespanPicker/TimespanPickerLoader';
import { OECD_COUNTRIES } from '@constants/currencies';
import { SERVER_DATE, YEAR_MONTH_FORMAT } from '@constants/dateTime';
import { TIMESPANS } from '@constants/timespans';
import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Timespan } from '@interfaces/ICharts';
import { WalletCurrency } from '@src/zustand/walletStore';
import { objectEntries } from '@utils/misc';

import WalletChartLoader from './loaders/WalletChartLoader';
import WalletCurrenciesSelectorsLoader from './loaders/WalletCurrenciesSelectorsLoader';
import { useReplaceInvalidWalletParams } from '../hooks/useReplaceInvalidWalletParams';
import useUpdateWalletStore from '../hooks/useUpdateWalletStore';

const TimespanPicker = dynamic(() => import('@components/timespanPicker'), {
  loading: () => <TimespanPickerLoader />,
});

const WalletCurrenciesSelectors = dynamic(
  () => import('./WalletCurrenciesSelectors'),
  {
    loading: () => <WalletCurrenciesSelectorsLoader />,
  },
);

const WalletChart = dynamic(() => import('./WalletChart'), {
  loading: () => <WalletChartLoader />,
  ssr: false,
});

const WalletHydrated = ({
  queryProps,
  ...props
}: {
  timespan: Timespan;
  walletQuoteCurrency: WalletCurrency;
  walletBaseCurrencies: WalletCurrency[];
  queryProps: PrefetchDailyCurrencyRatesRequest;
  isValidQuoteCurrency: boolean;
  isValidTimespan: boolean;
  isValidBaseCurrencies: boolean;
}) => {
  const router = useRouter();
  const [timespan, setTimespan] = useState<Timespan>(props.timespan); //local state to speed up UI updates
  const [isPending, startCurrenciesTransition] = useTransition();

  const startYearMonth = DateTime.fromISO(TIMESPANS[timespan])
    .minus({ months: 1 })
    .toFormat(YEAR_MONTH_FORMAT);

  const currencyCountry = objectEntries(OECD_COUNTRIES).find(
    ([currency]) => currency === props.walletQuoteCurrency.name,
  );

  const monthlyCPIQuery = useMonthlyCPIQuery({
    startPeriod: `${startYearMonth}-01`, //fetching extra month
    endPeriod: DateTime.now().toFormat(SERVER_DATE),
    country: currencyCountry?.[1], //possible undefined - not every currency has OECD data
    timespan,
  });

  useEffect(() => {
    setTimespan(props.timespan);
  }, [props.timespan]);

  const baseCurrenciesNames = useMemo(
    () => props.walletBaseCurrencies.map((c) => c.name),
    [props.walletBaseCurrencies],
  );

  const dailyCurrencyRatesOverYearQuery = useDailyCurrencyRatesOverYearQuery({
    ...queryProps,
    queryParams: {
      ...queryProps.queryParams,
      quote_currency: props.walletQuoteCurrency.name,
      base_currencies: baseCurrenciesNames,
      start_date: TIMESPANS[timespan],
    },
  });

  const toQueryString = useModifySearchParams();

  useUpdateWalletStore(props);
  useReplaceInvalidWalletParams(props);
  return (
    <div className="flex w-full flex-col gap-y-2">
      <TimespanPicker
        active={timespan}
        onSelect={(newTimespan) => {
          setTimespan(newTimespan);
          const newTimespanParam = toQueryString('timespan', newTimespan);

          startCurrenciesTransition(() => {
            void router.replace(`/wallet?${newTimespanParam}`, {
              forceOptimisticNavigation: true,
            });
          });
        }}
      />
      <WalletCurrenciesSelectors
        {...props}
        startCurrenciesTransition={startCurrenciesTransition}
      />
      <div className="mt-5">
        {!isPending ? (
          <div className="h-[40vh] min-h-[400px] w-full">
            <WalletChart
              dailyCurrencyRatesOverYearQuery={dailyCurrencyRatesOverYearQuery}
              monthlyCPIQuery={monthlyCPIQuery}
              {...props}
            />
          </div>
        ) : (
          <WalletChartLoader />
        )}
      </div>
    </div>
  );
};

export default WalletHydrated;
