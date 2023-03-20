import { ReactElement } from 'react';

import { DateTime } from 'luxon';
import { TooltipProps } from 'recharts';

import TooltipRowWrapper from '@components/TooltipRowWrapper';
import TooltipWrapper from '@components/TooltipWrapper';
import { CHART_THEME } from '@constants/chart';
import { CustomTooltipProps } from '@interfaces/ICharts';

import { InflationWalletOverTimeValue } from '../tools/inflationWalletOverTimeValue';

type P = [CustomTooltipProps<InflationWalletOverTimeValue>];

const InflationOverMonthsTooltip = ({
  active,
  payload,
  lastRangeMonth,
}: TooltipProps<number, string> & {
  lastRangeMonth: string;
}): ReactElement | null => {
  if (!active || !payload?.length) return null;
  const [{ payload: p }] = payload as P;

  return (
    <TooltipWrapper>
      <p>{`Miesiąc odniesienia: ${lastRangeMonth}`}</p>
      <div className="mb-1 mt-0.5 h-0.5 w-full border-b border-slate-50" />
      <TooltipRowWrapper>
        <p style={{ color: CHART_THEME[0] }}>{`Miesiąc: ${DateTime.fromISO(
          p.label,
        ).toFormat('LLL yyyy', { locale: 'pl' })}`}</p>
      </TooltipRowWrapper>
      <TooltipRowWrapper>
        <p>{'Skumulowana inflacja: '}</p>
        <p>{`${p.cumulativeInflation}%`}</p>
      </TooltipRowWrapper>
      <TooltipRowWrapper>
        <p>{'Inflacja miesięczna: '}</p>
        <p>{`${p.monthlyInflation}%`}</p>
      </TooltipRowWrapper>
    </TooltipWrapper>
  );
};
export default InflationOverMonthsTooltip;
