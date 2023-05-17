import { Button } from '@components/ui/Button';
import { TIMESPANS } from '@constants/timespans';
import { Timespan } from '@interfaces/ICharts';
import { cn } from '@utils/misc';

export const TimespanPicker = ({
  active,
  onSelect,
}: {
  active: Timespan;
  onSelect: (newTimespan: Timespan) => void;
}) => (
  <div className="flex w-full items-center justify-center gap-x-0.5 xs:gap-x-2 sm:gap-x-3">
    {Object.keys(TIMESPANS).map((timespan) => (
      <Button
        className={cn(
          'rounded-full ',
          active === timespan ? 'bg-electric_blue text-white' : 'border',
        )}
        key={timespan}
        onClick={() => {
          onSelect(timespan as Timespan);
        }}
      >
        {timespan.toUpperCase()}
      </Button>
    ))}
  </div>
);
