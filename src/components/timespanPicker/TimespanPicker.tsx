import { Button } from '@components/ui/Button';
import { TIMESPANS } from '@constants/timespans';
import { Timespan } from '@interfaces/ICharts';
import { cn, objectKeys } from '@utils/misc';

export const TimespanPicker = ({
  active,
  onSelect,
}: {
  active: Timespan;
  onSelect: (newTimespan: Timespan) => void;
}) => (
  <div className="flex w-full items-center justify-center gap-x-0.5 xs:gap-x-2 sm:gap-x-3">
    {objectKeys(TIMESPANS).map((timespan) => (
      <Button
        className={cn(
          'rounded-full ',
          active === timespan ? 'bg-electric_blue text-white' : 'border',
        )}
        key={timespan}
        onClick={() => {
          if (timespan === active) return; //blocking setting active timespan option
          onSelect(timespan);
        }}
      >
        {timespan.toUpperCase()}
      </Button>
    ))}
  </div>
);
