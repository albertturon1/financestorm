/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { ReactElement } from 'react';

import { TooltipProps } from 'recharts';

import TooltipWrapper from '@components/TooltipWrapper';
import { CHART_THEME } from '@constants/chartTheme';
import { serverDateToParts } from '@utils/misc';

const InflationOverMonthsTooltip = ({
  active,
  payload,
  lastRangeMonth,
}: TooltipProps<number, string> & {
  lastRangeMonth: string;
}): ReactElement | null => {
  if (!active || !payload?.length) return null;
  const row = 'mb-1 flex items-center gap-x-2';

  return (
    <TooltipWrapper>
      <p
        className="py-2"
        style={{ color: CHART_THEME[0] }}
      >{`Miesiąc: ${serverDateToParts(payload[0].payload.label, 'month')}`}</p>
      <div className={row}>
        <p>{'Skumulowana inflacja: '}</p>
        <p>{`${payload[0].value}%`}</p>
      </div>
      <div className={row}>
        <p>{'Inflacja miesięczna: '}</p>
        <p>{`${payload[0].payload.monthlyInflation}%`}</p>
      </div>
      <div className="mb-1 mt-0.5 h-0.5 w-full border-b border-slate-50" />
      <p>{`Miesiąc odniesienia: ${lastRangeMonth}`}</p>
    </TooltipWrapper>
  );
};
export default InflationOverMonthsTooltip;
