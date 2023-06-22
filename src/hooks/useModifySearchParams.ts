import { useCallback } from 'react';

import { useSearchParams } from 'next/navigation';

import { createQueryString } from '@utils/misc';

/**
 * @returns callback that is used to set search params
 */

export const useModifySearchParams = () => {
  const searchParams = useSearchParams();

  return useCallback(
    (param: string, value: string) =>
      createQueryString({ param, value, searchParams }),
    [searchParams],
  );
};
