'use client';

import { ReactNode, useRef } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ReactQueryWrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          cacheTime: 10 * 60 * 1000,
          staleTime: 11 * 60 * 1000,
          retry: 1,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryWrapper;
