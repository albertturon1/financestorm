import { ReactElement } from 'react';

import { TooltipProps } from 'recharts';

const InflationOverMonthsTooltip = ({
  active,
  payload,
}: TooltipProps<number, string> & {
  lastRangeMonth: string;
}): ReactElement | null => {
  if (!active || !payload?.length) return null;

  return <div />;
};
export default InflationOverMonthsTooltip;
