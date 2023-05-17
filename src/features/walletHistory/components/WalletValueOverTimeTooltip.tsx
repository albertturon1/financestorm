import { TooltipProps } from 'recharts';

const WalletValueOverTimeTooltip = ({
  active,
  payload,
}: TooltipProps<number, string> & {
  currentWalletValue: number;
}) => {
  if (!active || !payload?.length) return null;

  return <div />;
};

export default WalletValueOverTimeTooltip;
