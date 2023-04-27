import { DateTimeFormatOptions } from 'luxon';
import { TooltipProps } from 'recharts';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import { ValueType } from 'tailwindcss/types/config';

import TooltipWrapper from '@components/tooltip/TooltipWrapper';
import { CustomTooltipProps, LabelValue } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';

type Payload1 = [CustomTooltipProps<LabelValue>];

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
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  } satisfies DateTimeFormatOptions;
  const localDateString = date.toLocaleDateString('en-US', options);

  return (
    <TooltipWrapper className="text-sm font-bold">
      <p>{localDateString}</p>
      <p>{`Rate: ${p.value} ${quoteCurrency}`}</p>
    </TooltipWrapper>
  );
};
export default CurrencyRatePairChartTooltip;
