import { ReactElement } from 'react';

import { TooltipProps } from 'recharts';

import TooltipWrapper from '@components/TooltipWrapper';
import { serverDateToParts } from '@utils/misc';

const InflationOverMonthsTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>): ReactElement | null => {
  if (!active || !payload?.length) return null;
  const row = 'mb-1 flex items-center gap-x-2';

  return (
    <TooltipWrapper>
      <p className="pb-2">{`Miesiąc: ${serverDateToParts(
        payload[0].payload.label,
        'month',
      )}`}</p>
      <div className={row}>
        <p>{'Skumulowana inflacja: '}</p>
        <p>{`${payload[0].value}%`}</p>
      </div>
      <div className={row}>
        <p>{'Utrata wartości: '}</p>
        <p>{`${payload[0].payload.inflationLoss}`}</p>
      </div>
    </TooltipWrapper>
  );
};
export default InflationOverMonthsTooltip;
