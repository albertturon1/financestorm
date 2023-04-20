import { TooltipProps } from 'recharts';

import TooltipWrapper from '@components/TooltipWrapper';
import { CustomTooltipProps } from '@interfaces/ICharts';

type P = [
  CustomTooltipProps<{
    label: string;
    value: number;
  }>,
];

const UserFavouriteCurrencyRateTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  const [{ payload: p }] = payload as P;
  return (
    <TooltipWrapper>
      <p className="text-sm font-bold">{p.label}</p>
      <p className="text-sm font-bold">{p.value}</p>
    </TooltipWrapper>
  );
};
export default UserFavouriteCurrencyRateTooltip;
