import { Button } from '@components/ui/Button';
import { TIMESPANS } from '@constants/timespans';
import { ChartTimespan } from '@interfaces/ICharts';
import { cn } from '@utils/misc';

const TimespanPicker = ({
  onSelect,
  active,
}: {
  onSelect: (timespan: ChartTimespan) => void;
  active: ChartTimespan;
}) => (
  <div className="flex  w-full items-center justify-center gap-x-0.5 xs:gap-x-2 sm:gap-x-3">
    {Object.keys(TIMESPANS).map((timespan) => (
      <Button
        className={cn(
          'rounded-full ',
          active === timespan ? 'bg-electric_blue text-white' : 'border',
        )}
        key={timespan}
        onClick={() => {
          onSelect(timespan as ChartTimespan);
        }}
      >
        {timespan.toUpperCase()}
      </Button>
    ))}
  </div>
);

export default TimespanPicker;
