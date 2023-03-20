'use client';

import { memo, use, useMemo } from 'react';

import { TooltipProps } from 'recharts';

import CustomLineChart from '@components/customLineChart/CustomLineChart';
import {
  customLineChartYDomain,
  xAxisDateTickFormatter,
} from '@components/customLineChart/CustomLineChartHelpers';
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

const tooltip = (props: TooltipProps<number, string>) => (
  <MultiCurrenciesLineChartTooltip {...props} />
);

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

  const yDomain = useMemo(
    () =>
      customLineChartYDomain(
        chartData.flatMap((c) => c.data.map((d) => d.value)),
        2,
      ),
    [chartData],
  );

  return (
    <div className="flex flex-1">
      <CustomLineChart
        margin={{ top: 5, left: -20 }}
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
    </div>
  );
};

const Memo = memo(MultiBaseCurrenciesLineChart);
export default Memo;
