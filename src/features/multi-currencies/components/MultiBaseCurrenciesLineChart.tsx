'use client';

import { memo, use, useCallback, useMemo } from 'react';

import { TooltipProps } from 'recharts';

import CustomLineChart, {
  customLineChartYDomain,
} from '@components/CustomLineChart/CustomLineChart';
import { xAxisDateTickFormatter } from '@components/CustomLineChart/CustomLineChartHelpers';
import { ChartMultiData } from '@interfaces/ICharts';
import { NormalizedCurrencyExchangeRate } from '@interfaces/models/IExchangerate';
import {
  useMultiCurrenciesQuoteCurrency,
  useMultiCurrenciesBaseCurrenciesNames,
} from '@src/zustand/multiCurrenciesStore';
import convertDailyCurrencyTimeseriesToChartData from '@utils/convertDailyCurrencyTimeseriesToChartData';
import dailyCurrencyTimeseriesYears from '@utils/dailyCurrencyTimeseriesYears';
import { nameOfKey } from '@utils/misc';
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
  const quoteCurrency = useMultiCurrenciesQuoteCurrency();
  const baseCurrencies = useMultiCurrenciesBaseCurrenciesNames();
  const baseCurrenciesNames = useMultiCurrenciesBaseCurrenciesNames();

  const data = use(
    queryClientSide([baseCurrenciesNames, quoteCurrency.id], () =>
      dailyCurrencyTimeseriesYears({
        quote_currency: quoteCurrency.name,
        base_currencies: baseCurrencies,
        years: 1,
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

  return (
    <CustomLineChart
      data={chartData}
      dataKeyExtractor={dataKeyExtractor}
      dataExtractor={dataExtractor}
      nameExtractor={nameExtractor}
      xAxisLabelExtractor={xAxisLabelExtractor}
      yAxisTickCount={10}
      yDomain={yDomain}
      xAxisLabel="label"
      tooltip={tooltip}
      xAxisTickFormatter={xAxisDateTickFormatter}
    />
  );
};

const Memo = memo(MultiBaseCurrenciesLineChart);
export default Memo;
