import { Button } from '@components/ui/Button';
import CHART_TIMESPANS, { ChartTimespan } from '@constants/chartTimespan';
import { cn } from '@utils/misc';

const CurrenciesBaseQuoteChartTimespanPicker = ({
  onSelect,
  active,
}: {
  onSelect: (timespan: ChartTimespan) => void;
  active: ChartTimespan;
}) => (
  <div className="flex  w-full items-center justify-center gap-x-0.5 xs:gap-x-2 sm:gap-x-3">
    {Object.keys(CHART_TIMESPANS).map((timespan) => (
      <Button
        className={cn(
          'rounded-full ',
          active === timespan && 'bg-blue text-white',
        )}
        key={timespan}
        onClick={() => {
          onSelect(timespan as ChartTimespan);
        }}
      >
        {timespan}
      </Button>
    ))}
  </div>
);

export default CurrenciesBaseQuoteChartTimespanPicker;
