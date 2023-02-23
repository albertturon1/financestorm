'use client';

import { memo, use, useCallback, useMemo } from 'react';

import { TooltipProps } from 'recharts';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/CustomLineChart';
import { RechartsMultiData } from '@interfaces/ICharts';
import { ExchangeRateTimeseriesNormalized } from '@interfaces/models/IExchangerate';
import {
  useBaseCurrenciesNames,
  useMutliChartRange,
  useQuoteCurrency,
} from '@src/zustand/multiCurrenciesStore';
import { nameOfKey } from '@utils/misc';
import queryClientSide from '@utils/queryClientSide';

import MultiCurrenciesLineChartTooltip from './MultiCurrenciesLineChartTooltip';
import dailyMultiCurrencyData from '../tools/dailyMultiCurrencyData';

const nameExtractor = (item: RechartsMultiData) => item.name;
const dataExtractor = (item: RechartsMultiData) => item.data;
const dataKeyExtractor = (item: RechartsMultiData) =>
  nameOfKey(item.data[0], (x) => x.value);

const MultiBaseCurrenciesLineChart = () => {
  const quoteCurrency = useQuoteCurrency();
  const mutliChartRange = useMutliChartRange();
  const baseCurrenciesNames = useBaseCurrenciesNames();

  const data = use(
    queryClientSide<ExchangeRateTimeseriesNormalized[]>(
      `${baseCurrenciesNames.sort().join('')}${quoteCurrency.id}${
        mutliChartRange.value
      }`,
      () =>
        dailyMultiCurrencyData({
          years: mutliChartRange.value,
          quote_currency: quoteCurrency?.name,
          base_currencies: baseCurrenciesNames,
        }),
    ),
  );

  const chartData = useMemo(
    () =>
      data
        ?.flatMap((d) => ({ name: d.base, data: d.rates }))
        .filter((z) => z.data.length) as RechartsMultiData[],
    [data],
  );
  const values = useMemo(
    () => chartData.flatMap((c) => c.data.map((d) => d.value)),
    [chartData],
  );

  const yDomain = useMemo(
    () => [0, customLineChartYDomain(values, 2)[1], 2], //mutli nie działa
    [values],
  );

  const tooltip = useCallback(
    (props: TooltipProps<number, string>) => (
      <MultiCurrenciesLineChartTooltip {...props} />
    ),
    [],
  );

  return (
    <CustomLineChart
      data={chartData}
      dataKeyExtractor={dataKeyExtractor}
      dataExtractor={dataExtractor}
      nameExtractor={nameExtractor}
      keyExtractor={nameExtractor}
      yAxisTickCount={10}
      yDomain={yDomain}
      xAxisLabel="label"
      tooltip={tooltip}
    />
  );
};
const Memo = memo(MultiBaseCurrenciesLineChart);
export default Memo;
