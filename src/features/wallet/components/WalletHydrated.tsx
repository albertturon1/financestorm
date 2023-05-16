'use client';

import {
  useMemo,
  useTransition,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

import TimespanPickerLoader from '@components/misc/timespanPicker/TimespanPickerLoader';
import { OECD_COUNTRIES } from '@constants/currencies';
import { SERVER_DATE, YEAR_MONTH_FORMAT } from '@constants/dateTime';
import { TIMESPANS } from '@constants/timespans';
import { Timespan } from '@interfaces/ICharts';
import { useDailyCurrencyRatesOverYearQuery } from '@src/api/client/CurrenctyRateClientApi';
import { useMonthlyCPIQuery } from '@src/api/client/OECDClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrencyRateApi';
import { WalletCurrency, useWalletActions } from '@src/zustand/walletStore';
import { createQueryString } from '@utils/misc';

import WalletChartLoader from './loaders/WalletChartLoader';
import WalletCurrenciesSelectorsLoader from './loaders/WalletCurrenciesSelectorsLoader';

const TimespanPicker = dynamic(
  () => import('@components/misc/timespanPicker'),
  {
    loading: () => <TimespanPickerLoader />,
  },
);

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
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { patchWalletTimespan } = useWalletActions();
  const [timespan, setTimespan] = useState<Timespan>(props.timespan); //local state to speed up UI updates
  const [isPending, startCurrenciesTransition] = useTransition();

  const startYearMonth = DateTime.fromISO(TIMESPANS[timespan])
    .minus({ months: 1 })
    .toFormat(YEAR_MONTH_FORMAT);

  const monthlyCPIQuery = useMonthlyCPIQuery({
    startPeriod: `${startYearMonth}-01`, //fetching extra month
    endPeriod: DateTime.now().toFormat(SERVER_DATE),
    country: OECD_COUNTRIES[props.walletQuoteCurrency.name],
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

  const toQueryString = useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );

  return (
    <div className="flex w-full flex-col gap-y-6 lg:gap-y-8">
      <TimespanPicker
        active={timespan}
        onSelect={(newTimespan) => {
          setTimespan(newTimespan);
          const newTimespanParam = `${toQueryString('timespan', newTimespan)}`;

          startCurrenciesTransition(() => {
            void router.replace(`/wallet?${newTimespanParam}`, {
              forceOptimisticNavigation: true,
            });

            patchWalletTimespan(newTimespan);
          });
        }}
      />
      <WalletCurrenciesSelectors
        {...props}
        startCurrenciesTransition={startCurrenciesTransition}
      />
      {!isPending ? (
        <WalletChart
          dailyCurrencyRatesOverYearQuery={dailyCurrencyRatesOverYearQuery}
          monthlyCPIQuery={monthlyCPIQuery}
          {...props}
        />
      ) : (
        <WalletChartLoader />
      )}
    </div>
  );
};

export default WalletHydrated;
