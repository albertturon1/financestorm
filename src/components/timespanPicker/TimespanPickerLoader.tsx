import SkeletonLoader from '@components/ui/SkeletonLoader';
import { TIMESPANS } from '@constants/timespans';
import { objectKeys } from '@utils/misc';

const TimespanPickerLoader = () => (
  <SkeletonLoader
    className="h-10 self-center"
    style={{ width: objectKeys(TIMESPANS).length * 55 }}
  />
);

export default TimespanPickerLoader;
