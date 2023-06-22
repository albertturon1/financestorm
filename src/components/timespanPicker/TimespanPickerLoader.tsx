import SkeletonLoader from '@components/ui/SkeletonLoader';
import { TIMESPANS } from '@constants/timespans';

const TimespanPickerLoader = () => (
  <SkeletonLoader
    className="h-10 self-center"
    style={{ width: Object.keys(TIMESPANS).length * 55 }}
  />
);

export default TimespanPickerLoader;
