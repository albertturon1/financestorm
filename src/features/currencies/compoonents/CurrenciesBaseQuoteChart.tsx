'use client';

import { useCallback, useMemo } from 'react';

import { TooltipProps } from 'recharts';

import CustomLineChart from '@components/customLineChart';
import {
  customLineChartYDomain,
  xAxisDateTickFormatter,
} from '@components/customLineChart/CustomLineChartHelpers';
import MultiCurrenciesLineChartTooltip from '@features/multi-currencies/components/MultiCurrenciesLineChartTooltip';
import {
  ExchangeRateTimeseries,
  NormalizedCurrencyExchangeRate,
} from '@interfaces/models/IExchangerate';
import { nameOfKey } from '@utils/misc';

type CurrenciesBaseQuoteChartData = Omit<
  ExchangeRateTimeseries,
  'rates_array'
> & {
  rates_array: NormalizedCurrencyExchangeRate[];
};

const nameExtractor = (item: CurrenciesBaseQuoteChartData) =>
  item.base_currencies[0];
const dataExtractor = (item: CurrenciesBaseQuoteChartData) => item.rates_array;
const xAxisLabelExtractor = (item: CurrenciesBaseQuoteChartData) =>
  nameOfKey(item.rates_array[0], (x) => x.label);
const dataKeyExtractor = (item: CurrenciesBaseQuoteChartData) =>
  nameOfKey(item.rates_array[0], (x) => x.value);

const CurrenciesBaseQuoteChart = ({
  data,
}: {
  data: ExchangeRateTimeseries;
}) => {
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
  const margin = useMemo(
    () => ({ top: 5, left: yDomain[0] < 1 ? 15 : -15, right: 10 }),
    [yDomain],
  );

  const tooltip = useCallback(
    (props: TooltipProps<number, string>) => (
      <MultiCurrenciesLineChartTooltip {...props} />
    ),
    [],
  );

  return (
    <CustomLineChart
      margin={margin}
      yAxisTickCount={8}
      data={[chartData]}
      dataKeyExtractor={dataKeyExtractor}
      xAxisLabelExtractor={xAxisLabelExtractor}
      dataExtractor={dataExtractor}
      nameExtractor={nameExtractor}
      yDomain={yDomain}
      xAxisLabel="date"
      tooltip={tooltip}
      legend={false}
      xAxisTickFormatter={xAxisDateTickFormatter}
    />
  );
};

export default CurrenciesBaseQuoteChart;
