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
  CartesianGrid,
} from 'recharts';

import DataLoader, { DataLoaderQueryProps } from '@components/ui/DataLoader';
import {
  CHART_THEME,
  CHART_X_AXIS_TICK_FORMATTER_OPTIONS,
} from '@constants/chart';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponse } from '@interfaces/models/IExchangerate';
import Theme from '@src/Theme';
import { yAxisDomainFormatter } from '@utils/chartHelpers';
import { separateDailyCurrencyRates } from '@utils/currencyRateApiHelpers';

import MultiCurrenciesChartTooltip from './MultiCurrenciesChartTooltip';

export type CurrencyNameAndArrayIndex = { name: Currency; index: number };

export const MultiCurrenciesChart = ({
  ...props
}: {
  quoteCurrency: Currency;
} & DataLoaderQueryProps<ExchangeRateTimeseriesResponse | undefined>) => (
  <DataLoader {...props}>
    {(data) => {
      const dailyCurrencyRates = separateDailyCurrencyRates(data);

      //array of original index for matching tooltip colors with chart
      const originalIndexesOfCurrencies = dailyCurrencyRates.rates_array.reduce(
        (acc, item, index) => {
          acc.push({ name: item.base_currency, index });
          return acc;
        },
        [] as CurrencyNameAndArrayIndex[],
      );

      return (
        <ResponsiveContainer className="select-none" width="100%" height="100%">
          <LineChart>
            <XAxis
              tickMargin={10}
              tick={{ fontSize: 15, letterSpacing: -0.5 }}
              dataKey="date"
              allowDuplicatedCategory={false}
              tickFormatter={(tick: string) =>
                new Date(tick).toLocaleDateString(
                  'en-US',
                  CHART_X_AXIS_TICK_FORMATTER_OPTIONS,
                )
              }
            />
            <CartesianGrid vertical={false} />
            <YAxis
              domain={yAxisDomainFormatter}
              tickCount={5}
              mirror
              tick={{
                fill: Theme.colors.dark_navy,
                dy: -11,
                fontSize: 14,
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            {dailyCurrencyRates.rates_array.map((currencyRates) => (
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
              content={(tooltipProps: TooltipProps<number, string>) => (
                <MultiCurrenciesChartTooltip
                  {...tooltipProps}
                  {...props}
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
