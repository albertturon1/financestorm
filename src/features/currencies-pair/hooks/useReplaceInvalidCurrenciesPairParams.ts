import { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

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
  const params = useParams();

  const toQueryString = useModifySearchParams();

  useEffect(() => {
    if (!isValidTimespan) {
      const newTimespanParam = toQueryString('timespan', timespan);

      void router.replace(`/currencies/${params.pair}?${newTimespanParam}`, {
        forceOptimisticNavigation: true,
      });
    }
  }, [isValidTimespan, params.pair, router, timespan, toQueryString]);
};
