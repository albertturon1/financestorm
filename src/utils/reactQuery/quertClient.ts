import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.ENVIRONMENT === 'production',
      refetchOnWindowFocus: process.env.ENVIRONMENT === 'production',
    },
  },
});

export default queryClient;
