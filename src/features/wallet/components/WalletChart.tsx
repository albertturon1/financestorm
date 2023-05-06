'use client';

import { DateTimeFormatOptions } from 'luxon';
import {
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  Brush,
  AreaChart,
} from 'recharts';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import { ValueType } from 'tailwindcss/types/config';

import CurrencyRatePairChartTooltip from '@components/misc/CurrencyRatePairChartTooltip';
import DataLoader, { DataLoaderQueryProps } from '@components/ui/DataLoader';
import useWindowSize from '@hooks/useWindowSize';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponse } from '@interfaces/models/IExchangerate';
import Theme from '@src/Theme';
import {
  xAxisIntervalDivider,
  yAxisDomainFormatter,
} from '@utils/chartHelpers';
import { separateToDailyCurrencyRates } from '@utils/currencyRateApiHelpers';

// function getData({
//   data,
//   walletQuoteCurrency,
//   walletBaseCurrencies,
// }: {
//   data: ExchangeRateTimeseriesResponseRates;
//   walletQuoteCurrency: WalletCurrency;
//   walletBaseCurrencies: WalletCurrency[];
// }) {
//   return Object.entries(data.rates).map(([day, dayRate]) => {

//   });
// }

const WalletChart = (
  props: {
    quoteCurrency: Currency;
    baseCurrencies: Currency[];
  } & DataLoaderQueryProps<ExchangeRateTimeseriesResponse | undefined>,
) => {
  const { screenWidth } = useWindowSize();

  const options = {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  } satisfies DateTimeFormatOptions;

  //data loader makes sense when data is being refetch on client - best thing you can do is to handle errors and show fallback when loading --- dont forget to set ssr: false
  return (
    <DataLoader {...props}>
      {(data) => {
        const dailyCurrencyRates = separateToDailyCurrencyRates(data);
        const [currencyRates] = dailyCurrencyRates.rates_array;

        const interval = xAxisIntervalDivider({
          screenWidth,
          itemsLength: currencyRates.rates.length,
        });

        return (
          <div className="flex flex-col gap-y-10">
            <div className="h-[45vh] w-full">
              <ResponsiveContainer width={'100%'} height={'100%'}>
                <AreaChart data={currencyRates.rates}>
                  <XAxis
                    tickMargin={10}
                    height={50}
                    dataKey="date"
                    interval={interval}
                    tickFormatter={(tick: string) =>
                      new Date(tick).toLocaleDateString('en-US', options)
                    }
                  />
                  <YAxis
                    domain={yAxisDomainFormatter}
                    tickCount={5}
                    mirror
                    tick={{ fill: Theme.colors.dark_navy }}
                  />
                  <CartesianGrid vertical={false} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={Theme.colors.navy}
                    fill={Theme.colors.dark_navy}
                  />
                  <Brush
                    dataKey="date"
                    height={40}
                    stroke={Theme.colors.dark_navy}
                    travellerWidth={screenWidth < 768 ? 20 : 15} //easier to handle on mobile when value is higher
                  />
                  <Tooltip
                    content={(
                      tooltipProps: TooltipProps<ValueType, NameType>,
                    ) => (
                      <CurrencyRatePairChartTooltip
                        {...props}
                        {...tooltipProps}
                      />
                    )}
                    cursor={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      }}
    </DataLoader>
  );
};

export default WalletChart;
