import { TooltipProps } from 'recharts';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import { ValueType } from 'tailwindcss/types/config';

import TooltipWrapper from '@components/tooltip/TooltipWrapper';
import { CHART_TOOLTIP_DATE_OPTIONS } from '@constants/chart';
import { CustomTooltipProps, DateValue } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';

type Payload1 = [CustomTooltipProps<DateValue>];

const CurrencyRatePairChartTooltip = ({
  active,
  payload,
  quoteCurrency,
}: TooltipProps<ValueType, NameType> & {
  quoteCurrency: Currency;
}) => {
  if (!active || !payload?.length) return null;
  const [{ payload: p }] = payload as unknown as Payload1;

  const date = new Date(p.date);
  const localDateString = date.toLocaleDateString(
    'en-US',
    CHART_TOOLTIP_DATE_OPTIONS,
  );

  return (
    <TooltipWrapper>
      <p>{localDateString}</p>
      <p>{`Rate: ${p.value} ${quoteCurrency.toUpperCase()}`}</p>
    </TooltipWrapper>
  );
};
export default CurrencyRatePairChartTooltip;
