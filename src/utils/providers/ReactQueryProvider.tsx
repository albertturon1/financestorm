'use client';

import { PropsWithChildren, useState } from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers = ({ children }: PropsWithChildren) => {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
