'use client';

import {
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Brush,
  AreaChart,
} from 'recharts';

import DataLoader, { DataLoaderQueryProps } from '@components/ui/DataLoader';
import { CHART_X_AXIS_TICK_FORMATTER_OPTIONS } from '@constants/chart';
import useWindowSize from '@hooks/useWindowSize';
import { LabelValue } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import {
  ExchangeRateTimeseriesRatesArray,
  ExchangeRateTimeseriesResponse,
} from '@interfaces/models/IExchangerate';
import Theme from '@src/Theme';
import { WalletCurrency } from '@src/zustand/walletStore';
import { yAxisDomainFormatter } from '@utils/chartHelpers';
import { dailyCurrencyRatesToArray } from '@utils/currencyRateApiHelpers';
import { cutNumber, substitueNaNToZero } from '@utils/misc';


type WalletDayCurrency = {
  currency: Currency;
  rate: number;
  amount: number;
  converted_amount: number;
};

type WalletDayRates = { baseCurrenciesInfo: WalletDayCurrency[] } & LabelValue;

function getData({
  ratesArray,
  walletQuoteCurrency,
  walletBaseCurrencies,
}: {
  ratesArray: ExchangeRateTimeseriesRatesArray[];
  walletQuoteCurrency: WalletCurrency;
  walletBaseCurrencies: WalletCurrency[];
}) {
  return ratesArray.map((day) => {
    const a = Object.entries(day.rates).reduce(
      (acc, [currency, rate]) => {
        const currencyItem = walletBaseCurrencies.find(
          (c) =>
            // console.log('c.name: ', c.name);
            c.name === (currency.toLowerCase() as Currency), //currency is uppercase
        );
        if (!currencyItem) return acc;
        const converted_amount = cutNumber(currencyItem.amount * rate);
        // eslint-disable-next-line no-param-reassign
        acc.value += converted_amount;
        acc.baseCurrenciesInfo.push({
          amount: currencyItem.amount,
          converted_amount,
          rate,
          currency: currency as Currency,
        });
        return acc;
      },
      {
        value: substitueNaNToZero(walletQuoteCurrency.amount),
        baseCurrenciesInfo: [],
      } as Omit<WalletDayRates, 'date'>,
    );

    return { ...day, ...a, value: cutNumber(a.value) };
  }) satisfies WalletDayRates[];
}

const WalletChart = (
  props: {
    walletBaseCurrencies: WalletCurrency[];
    walletQuoteCurrency: WalletCurrency;
  } & DataLoaderQueryProps<ExchangeRateTimeseriesResponse | undefined>,
) => {
  const { screenWidth } = useWindowSize();
  // const reset = useWalletReset();
  // useEffect(() => {
  //   reset();
  // }, [reset]);

  //data loader makes sense when data is being refetch on client - best thing you can do is to handle errors and show fallback when loading --- dont forget to set ssr: false
  return (
    <DataLoader {...props}>
      {(data) => {
        const dailyCurrencyRatesArray = dailyCurrencyRatesToArray(
          data.rates,
          props.walletQuoteCurrency.name,
        );
        const chartRates = getData({
          ratesArray: dailyCurrencyRatesArray,
          ...props,
        });

        return (
          <div className="flex flex-col gap-y-10">
            <div className="h-[40vh] w-full">
              <ResponsiveContainer width={'100%'} height={'100%'}>
                <AreaChart data={chartRates} margin={{ top: 20 }}>
                  <XAxis
                    tickMargin={10}
                    tick={{ fontSize: 15, letterSpacing: -0.5 }}
                    height={50}
                    dataKey="date"
                    allowDuplicatedCategory={false}
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
                    tick={{ fill: Theme.colors.primaryBlack, dy: -11 }}
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
                  <Tooltip />
                  {/* <Tooltip
                    content={(
                      tooltipProps: TooltipProps<ValueType, NameType>,
                    ) => (
                      <WalletChartTooltip
                        {...props}
                        {...tooltipProps}
                        quoteCurrency={props.walletQuoteCurrency.name}
                      />
                    )}
                    cursor={false}
                  /> */}
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
