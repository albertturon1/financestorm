import { TooltipProps } from 'recharts';

import TooltipRowWrapper from '@components/tooltip/TooltipRowWrapper';
import TooltipWrapper from '@components/tooltip/TooltipWrapper';
import { CHART_TOOLTIP_DATE_OPTIONS } from '@constants/chart';
import { CustomTooltipProps } from '@interfaces/ICharts';
import { cutNumber } from '@utils/misc';

import { WalletValuesInTimespan } from '../tools/walletValueOverTime';

type Item = WalletValuesInTimespan[number];

//depends on availability of OECD data
type TooltipPayload =
  | [CustomTooltipProps<Item>, CustomTooltipProps<Item>]
  | [CustomTooltipProps<Item>];

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

  //inflation data might not be available
  const inflationAvailable = data.length === 2;
  const postInflationValue = inflationAvailable && data[1].value;
  const inflationLoss =
    postInflationValue && cutNumber(value - postInflationValue);

  return (
    <TooltipWrapper className="gap-y-2">
      <p className="font-normal">{localDateString}</p>
      <TooltipRowWrapper>
        <p>{'Value:'}</p>
        <p className="font-medium">{`${value} ${quoteCurrency.toUpperCase()}`}</p>
      </TooltipRowWrapper>
      {inflationAvailable && (
        <TooltipRowWrapper>
          <p>{'Post-inflation value:'}</p>
          <p className="font-medium">{`${postInflationValue} ${quoteCurrency.toUpperCase()}`}</p>
        </TooltipRowWrapper>
      )}
      {inflationAvailable && (
        <TooltipRowWrapper>
          <p>{'Accumulated inflation:'}</p>
          <p className="font-medium">
            {monthCumulativeInflation
              ? `${monthCumulativeInflation}%`
              : 'No data'}
          </p>
        </TooltipRowWrapper>
      )}
      {inflationAvailable && (
        <TooltipRowWrapper>
          <p>{'Inflation loss:'}</p>
          <p className="font-medium">{`${inflationLoss} ${quoteCurrency.toUpperCase()}`}</p>
        </TooltipRowWrapper>
      )}
    </TooltipWrapper>
  );
};
export default WalletChartTooltip;
