'use client';

import { use, useCallback, useMemo } from 'react';

import { DateTime } from 'luxon';
import { TooltipProps } from 'recharts';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/CustomLineChart';
import FlagCountryCode from '@components/FlagCountryCode';
import { PADDING_TAILWIND } from '@constants/globals';
import MultiCurrenciesLineChartTooltip from '@features/multi-currencies/components/MultiCurrenciesLineChartTooltip';
import { Currencies } from '@interfaces/ICurrency';
import {
  ExchangeRateTimeseries,
  NormalizedCurrencyExchangeRate,
} from '@interfaces/models/IExchangerate';
import { getDailyCurrencyTimeseriesOneYearQuery } from '@src/api/CurrenctyRateApi';
import { nameOfKey, serverDate } from '@utils/misc';
import queryClientSide from '@utils/queryClientSide';

import { CurrenciesPageProps } from '../page';

const nameExtractor = (item: A) => item.base_currencies[0];
const dataExtractor = (item: A) => item.rates_array;
const xAxisLabelExtractor = (item: A) =>
  nameOfKey(item.rates_array[0], (x) => x.label);
const dataKeyExtractor = (item: A) =>
  nameOfKey(item.rates_array[0], (x) => x.value);

export type CurrenciesPairPageProps = {
  quote: Currencies;
} & CurrenciesPageProps;

type A = Omit<ExchangeRateTimeseries, 'rates_array'> & {
  rates_array: NormalizedCurrencyExchangeRate[];
};

const CurrenciesPair = ({ params }: { params: CurrenciesPairPageProps }) => {
  const { currency, quote } = params;
  const data = use(
    queryClientSide([quote, currency, serverDate(new Date())], () =>
      getDailyCurrencyTimeseriesOneYearQuery({
        quote_currency: quote,
        base_currencies: [currency],
        start_date: DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd'),
        end_date: DateTime.now().toFormat('yyyy-MM-dd'),
      }),
    ),
  );

  const chartData = useMemo(
    () => ({
      ...data,
      rates_array: data.rates_array.map((d) => ({
        label: d.date,
        value: d.rates[data.base_currencies[0]],
        base_currency: data.base_currencies[0],
        quote_currency: data.quote_currency,
      })),
    }),
    [data],
  );

  const values = useMemo(
    () => chartData.rates_array.map((d) => d.value),
    [chartData.rates_array],
  );

  const yDomain = useMemo(() => customLineChartYDomain(values, 2), [values]);

  const tooltip = useCallback(
    (props: TooltipProps<number, string>) => (
      <MultiCurrenciesLineChartTooltip {...props} />
    ),
    [],
  );

  return (
    <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
      <div className="flex w-full justify-between pb-5">
        <div className="flex items-center gap-x-2 text-xl">
          <FlagCountryCode code={currency} className="gap-x-0" />
          <p className="text-2xl font-bold">{'/'}</p>
          <FlagCountryCode code={quote} className="gap-x-0" />
        </div>
      </div>
      <CustomLineChart
        yAxisTickCount={8}
        data={[chartData]}
        xAxisInterval={70}
        tickFormatter={(v) => DateTime.fromISO(v as string).toFormat('LLL, yy')}
        dataKeyExtractor={dataKeyExtractor}
        xAxisLabelExtractor={xAxisLabelExtractor}
        dataExtractor={dataExtractor}
        nameExtractor={nameExtractor}
        yDomain={yDomain}
        xAxisLabel="date"
        tooltip={tooltip}
        legend={false}
      />
    </div>
  );
};

export default CurrenciesPair;
