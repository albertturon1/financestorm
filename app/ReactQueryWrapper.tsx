'use client';

import { ReactNode, useRef } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ReactQueryWrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryWrapper;
