'use client';

import { PropsWithChildren, useMemo } from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers = ({ children }: PropsWithChildren) => {
  const client = useMemo(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
    [],
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
