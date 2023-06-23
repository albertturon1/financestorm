import { useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useModifySearchParams } from '@hooks/useModifySearchParams';
import { Timespan } from '@interfaces/ICharts';

export const useReplaceInvalidCurrenciesPairParams = ({
  isValidTimespan,
  timespan,
}: {
  isValidTimespan: boolean;
  timespan: Timespan;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const toQueryString = useModifySearchParams();
  const [_, _url, pair] = pathname.split('/');

  useEffect(() => {
    if (!isValidTimespan) {
      const newTimespanParam = toQueryString('timespan', timespan);

      void router.replace(`/currencies/${pair}?${newTimespanParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidTimespan, pair, router, timespan, toQueryString]);
};
