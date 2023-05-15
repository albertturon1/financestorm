import { TooltipProps } from 'recharts';

import TooltipRowWrapper from '@components/tooltip/TooltipRowWrapper';
import TooltipWrapper from '@components/tooltip/TooltipWrapper';
import { CHART_TOOLTIP_DATE_OPTIONS } from '@constants/chart';
import { CustomTooltipProps } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { CurrenciesRates } from '@interfaces/models/IExchangerate';
import { WalletCurrency } from '@src/zustand/walletStore';
import { cutNumber } from '@utils/misc';

type TooltipPayload = CustomTooltipProps<{
  baseCurrenciesInfo: {
    convertedPercentage: number;
    currency: Currency;
    rate: number;
    amount: number;
    convertedToQuoteAmount: number;
  }[];
  valueAfterInflation: number;
  monthCumulativeInflation: number | undefined;
  quoteCurrencyInfo: WalletCurrency;
  value: number;
  date: string;
  rates: CurrenciesRates;
}>[];

const WalletChartTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const data = payload as TooltipPayload;

  const date = new Date(data[0].payload.date);
  const localDateString = date.toLocaleDateString(
    'en-US',
    CHART_TOOLTIP_DATE_OPTIONS,
  );

  const { quoteCurrencyInfo } = data[0].payload;
  const { name: quoteCurrency } = quoteCurrencyInfo;
  const { monthCumulativeInflation } = data[0].payload;
  const [{ value }] = data;
  const postInflationValue = data[1].value;
  const inflationLoss = cutNumber(value - postInflationValue);

  return (
    <TooltipWrapper className="gap-y-2">
      <p className="font-normal">{localDateString}</p>
      <TooltipRowWrapper>
        <p>{'Value:'}</p>
        <p className='font-medium'>{`${value} ${quoteCurrency.toUpperCase()}`}</p>
      </TooltipRowWrapper>
      {monthCumulativeInflation && (
        <TooltipRowWrapper>
          <p>{'Post-inflation value:'}</p>
          <p className='font-medium'>{`${postInflationValue} ${quoteCurrency.toUpperCase()}`}</p>
        </TooltipRowWrapper>
      )}
      <TooltipRowWrapper>
        <p>{'Accumulated inflation:'}</p>
        <p className='font-medium'>
          {monthCumulativeInflation
            ? `${monthCumulativeInflation}%`
            : 'No data'}
        </p>
      </TooltipRowWrapper>
      {monthCumulativeInflation && (
        <TooltipRowWrapper>
          <p>{'Inflation loss:'}</p>
          <p className='font-medium'>{`${inflationLoss} ${quoteCurrency.toUpperCase()}`}</p>
        </TooltipRowWrapper>
      )}
    </TooltipWrapper>
  );
};
export default WalletChartTooltip;
