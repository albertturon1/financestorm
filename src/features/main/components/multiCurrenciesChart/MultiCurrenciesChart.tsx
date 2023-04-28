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

import SectionTitle from '@components/misc/SectionTitle';
import DataLoader from '@components/ui/DataLoader';
import {
  CHART_THEME,
  CHART_X_AXIS_TICK_FORMATTER_OPTIONS,
} from '@constants/chart';
import useWindowSize from '@hooks/useWindowSize';
import { Currency } from '@interfaces/ICurrency';
import { useDailyCurrencyRatesQuery } from '@src/api/client/CurrenctyRateClientApi';
import { PrefetchDailyCurrencyRatesRequest } from '@src/api/interfaces/ICurrenctyRateApi';
import Theme from '@src/Theme';
import {
  xAxisIntervalDivider,
  yAxisDomainFormatter,
} from '@utils/chartHelpers';
import { separateToDailyCurrencyRates } from '@utils/convertRatesToQuoteCurrency';

import MultiCurrenciesChartTooltip from './MultiCurrenciesChartTooltip';

export type CurrencyNameAndArrayIndex = { name: Currency; index: number };

export const MultiCurrenciesChart = ({
  queryProps,
  quoteCurrency,
}: {
  queryProps: PrefetchDailyCurrencyRatesRequest;
  quoteCurrency: Currency;
}) => {
  const { screenWidth } = useWindowSize();
  const query = useDailyCurrencyRatesQuery(queryProps);

  return (
    <div className="flex flex-col gap-y-2">
      <SectionTitle>{'Multi currencies chart'}</SectionTitle>
      <div className="h-[30vh] w-full">
        <DataLoader {...query}>
          {(data) => {
            const separateDailyCurrencyRates =
              separateToDailyCurrencyRates(data);

            const interval = xAxisIntervalDivider({
              screenWidth,
              itemsLength:
                separateDailyCurrencyRates.rates_array[0].rates.length,
            });

            //array of original index for matching tooltip colors with chart
            const originalIndexesOfCurrencies =
              separateDailyCurrencyRates.rates_array.reduce(
                (acc, item, index) => {
                  acc.push({ name: item.base_currency, index });
                  return acc;
                },
                [] as CurrencyNameAndArrayIndex[],
              );

            return (
              <ResponsiveContainer className="select-none">
                <LineChart>
                  <XAxis
                    tickMargin={10}
                    height={50}
                    dataKey="date"
                    type="category"
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
                    tickCount={5}
                    mirror
                    tick={{ fill: Theme.colors.dark_navy }}
                  />
                  <Legend
                    verticalAlign="top"
                    wrapperStyle={{ lineHeight: '40px' }}
                  />
                  {separateDailyCurrencyRates.rates_array.map(
                    (currencyRates) => (
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
                    ),
                  )}
                  <Tooltip
                    content={(props: TooltipProps<number, string>) => (
                      <MultiCurrenciesChartTooltip
                        {...props}
                        quoteCurrency={quoteCurrency}
                        originalIndexesOfCurrencies={
                          originalIndexesOfCurrencies
                        }
                      />
                    )}
                    cursor={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            );
          }}
        </DataLoader>
      </div>
    </div>
  );
};
