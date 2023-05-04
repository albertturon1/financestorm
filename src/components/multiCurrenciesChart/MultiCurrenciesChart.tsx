'use client';

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  TooltipProps,
} from 'recharts';

import DataLoader, { DataLoaderQueryProps } from '@components/ui/DataLoader';
import {
  CHART_THEME,
  CHART_X_AXIS_TICK_FORMATTER_OPTIONS,
} from '@constants/chart';
import useWindowSize from '@hooks/useWindowSize';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponse } from '@interfaces/models/IExchangerate';
import Theme from '@src/Theme';
import {
  xAxisIntervalDivider,
  yAxisDomainFormatter,
} from '@utils/chartHelpers';
import { separateToDailyCurrencyRates } from '@utils/convertRatesToQuoteCurrency';

import MultiCurrenciesChartTooltip from './MultiCurrenciesChartTooltip';

export type CurrencyNameAndArrayIndex = { name: Currency; index: number };

export const MultiCurrenciesChart = ({
  quoteCurrency,
  ...props
}: {
  quoteCurrency: Currency;
} & DataLoaderQueryProps<ExchangeRateTimeseriesResponse | undefined>) => {
  const { screenWidth } = useWindowSize();
  return (
    <DataLoader {...props}>
      {(data) => {
        const separateDailyCurrencyRates = separateToDailyCurrencyRates(data);

        const interval = xAxisIntervalDivider({
          screenWidth,
          itemsLength: separateDailyCurrencyRates.rates_array[0].rates.length,
        });

        //array of original index for matching tooltip colors with chart
        const originalIndexesOfCurrencies =
          separateDailyCurrencyRates.rates_array.reduce((acc, item, index) => {
            acc.push({ name: item.base_currency, index });
            return acc;
          }, [] as CurrencyNameAndArrayIndex[]);

        return (
          <ResponsiveContainer
            className="select-none"
            width="100%"
            height="100%"
          >
            <LineChart>
              <XAxis
                tickMargin={10}
                dataKey="date"
                allowDuplicatedCategory={false}
                interval={interval}
                tickFormatter={(tick: string) =>
                  new Date(tick).toLocaleDateString(
                    'en-US',
                    CHART_X_AXIS_TICK_FORMATTER_OPTIONS,
                  )
                }
              />
              <YAxis
                domain={yAxisDomainFormatter}
                type="number"
                tickCount={5}
                mirror
                tick={{ fill: Theme.colors.dark_navy }}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: '40px' }}
              />
              {separateDailyCurrencyRates.rates_array.map((currencyRates) => (
                <Line
                  strokeWidth={2}
                  dataKey="value"
                  data={currencyRates.rates}
                  name={currencyRates.base_currency}
                  key={currencyRates.base_currency}
                  stroke={
                    CHART_THEME[
                      originalIndexesOfCurrencies.findIndex(
                        (c) => c.name === currencyRates.base_currency,
                      ) % CHART_THEME.length
                    ]
                  }
                  dot={false}
                  type="monotone"
                />
              ))}
              <Tooltip
                content={(props: TooltipProps<number, string>) => (
                  <MultiCurrenciesChartTooltip
                    {...props}
                    quoteCurrency={quoteCurrency}
                    originalIndexesOfCurrencies={originalIndexesOfCurrencies}
                  />
                )}
                cursor={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      }}
    </DataLoader>
  );
};
