import { twMerge } from 'tailwind-merge';

const SegmentedSwitchDefaultButton = <T,>({
  onClick,
  title,
  item,
  className = '',
  active,
}: {
  onClick: (value: T) => void;
  item: T;
  className?: string;
  title: string;
  active: boolean;
}) => (
  <button
    className={twMerge(
      `h-10 cursor-pointer px-3 ${active ? 'bg-slate-500' : ''}`,
      className,
    )}
    onClick={() => {
      onClick?.(item);
    }}
  >
    {title}
  </button>
);

export default SegmentedSwitchDefaultButton;
