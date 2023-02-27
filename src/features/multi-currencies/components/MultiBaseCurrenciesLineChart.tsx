'use client';

import { memo, use, useCallback, useMemo } from 'react';

import { DateTime } from 'luxon';
import { TooltipProps } from 'recharts';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/CustomLineChart';
import { ChartMultiData } from '@interfaces/ICharts';
import { NormalizedCurrencyExchangeRate } from '@interfaces/models/IExchangerate';
import { getDailyCurrencyTimeseries } from '@src/api/CurrenctyRateApi';
import {
  useBaseCurrenciesNames,
  useMutliChartRange,
  useQuoteCurrency,
} from '@src/zustand/multiCurrenciesStore';
import convertDailyCurrencyTimeseriesToChartData from '@utils/convertDailyCurrencyTimeseriesToChartData';
import { dateDiff, nameOfKey, serverDate, xAxisInterval } from '@utils/misc';
import queryClientSide from '@utils/queryClientSide';

import MultiCurrenciesLineChartTooltip from './MultiCurrenciesLineChartTooltip';

const nameExtractor = (item: ChartMultiData<NormalizedCurrencyExchangeRate>) =>
  item.name;
const dataExtractor = (item: ChartMultiData<NormalizedCurrencyExchangeRate>) =>
  item.data;
const dataKeyExtractor = (
  item: ChartMultiData<NormalizedCurrencyExchangeRate>,
) => nameOfKey(item.data[0], (x) => x.value);

const xAxisLabelExtractor = (
  item: ChartMultiData<NormalizedCurrencyExchangeRate>,
) => nameOfKey(item.data[0], (x) => x.label);

const MultiBaseCurrenciesLineChart = () => {
  const quoteCurrency = useQuoteCurrency();
  const baseCurrencies = useBaseCurrenciesNames();
  const mutliChartRange = useMutliChartRange();
  const baseCurrenciesNames = useBaseCurrenciesNames();

  const data = use(
    queryClientSide(
      [baseCurrenciesNames, quoteCurrency.id, mutliChartRange.value],
      () =>
        getDailyCurrencyTimeseries({
          quote_currency: quoteCurrency.name,
          base_currencies: baseCurrencies,
          start_date: '2021-01-27',
          end_date: serverDate(new Date()),
        }),
    ),
  );

  const chartData = useMemo(
    () => convertDailyCurrencyTimeseriesToChartData(data),
    [data],
  );

  const yDomain = customLineChartYDomain(
    chartData.flatMap((c) => c.data.map((d) => d.value)),
    2,
  );

  const tooltip = useCallback(
    (props: TooltipProps<number, string>) => (
      <MultiCurrenciesLineChartTooltip {...props} />
    ),
    [],
  );

  const { months: monthsDiff } = dateDiff(data.start_date, data.end_date);

  const interval = xAxisInterval(monthsDiff);

  return (
    <CustomLineChart
      data={chartData}
      dataKeyExtractor={dataKeyExtractor}
      dataExtractor={dataExtractor}
      nameExtractor={nameExtractor}
      xAxisLabelExtractor={xAxisLabelExtractor}
      yAxisTickCount={10}
      xAxisInterval={'preserveStartEnd'}
      //xAxisInterval={chuj}
      tickFormatter={(v) =>
        DateTime.fromISO(v as string).toFormat('dd.LLL yy', {
          locale: 'pl',
        })
      }
      yDomain={yDomain}
      xAxisLabel="label"
      tooltip={tooltip}
    />
  );
};

const Memo = memo(MultiBaseCurrenciesLineChart);
export default Memo;
