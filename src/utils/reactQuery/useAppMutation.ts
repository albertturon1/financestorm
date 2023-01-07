import {
  QueryClient,
  QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import api, {HTTPMutationMethods} from '@utils/api';

/**
 * @param method - HTTPMutationMethod
 */
interface MutationMethod {
  method: HTTPMutationMethods;
}

/**
 * @param url - The request URL
 * @param method - HTTPMutationMethod
 */
export interface AppMutationMandatory<S> extends MutationMethod {
  url: (data: S) => string;
}

/**
 * @param queryKey - The query key to access cache for mutation
 * @param mutation - Mutate query cache
 * @param cancelKeys - Array of query keys to cancel refetch during execution of mutation
 * @param invalidateKeys - Array of query keys to invalidate on mutation success
 *
 */

export type AppMutationOptional<T, S> = {
  /**The query key to access cache for mutation*/
  queryKey?: (data: S) => QueryKey;
  /**Mutate query cache*/
  mutation?: (oldData: T, newData: S, queryClient: QueryClient) => T;
  /**Array of query keys to cancel refetch during execution of mutation*/
  cancelKeys?: (data: S) => readonly QueryKey[];
  /**Array of query keys to invalidate on mutation success*/
  invalidateKeys?: (data: S) => readonly QueryKey[];
};

type AppMutation<T, S> = AppMutationMandatory<S> & AppMutationOptional<T, S>;

/**
 * T is data from cache (usually wrapped in DataResponse), \
 * S is data passed to mutate cached data
 *
 * @param method - HTTPMutationMethod
 * @param queryKey - The query key to access cache for mutation
 * @param mutation - Mutate query cache
 * @param cancelKeys - Array of query keys to cancel refetch during execution of mutation
 * @param invalidateKeys - Array of query keys to invalidate on mutation success
 *
 */
export type AppMutationCommon<T, S> = MutationMethod &
  AppMutationOptional<T, S>;

/**
 * Returns React Query useMutation customized hook
 *
 * OBJECT {
 * @param method - HTTPMutationMethod
 * @param url - The request URL
 * @param queryKey? - The query key to access cache for mutation
 * @param mutation? - Mutate query cache
 * @param cancelKeys? - Array of query keys to cancel refetch during execution of mutation
 * @param invalidateKeys? - Array of query keys to invalidate on mutation success
 *
 *}
 * @returns React Query useMutation customized hook
 *
 */

const useAppMutation = <T, S>({
  method,
  url,
  queryKey,
  mutation,
  cancelKeys,
  invalidateKeys,
}: AppMutation<T, S>) => {
  const queryClient = useQueryClient();

  return useMutation((data: S) => api[method](url(data), data), {
    onMutate: async data => {
      if (!queryKey) return;
      await queryClient.cancelQueries(queryKey(data)); //original query key to invalidate

      cancelKeys?.(data).map(async key => await queryClient.cancelQueries(key)); //optional queries to cancel refetches

      const previousData = queryClient.getQueryData(queryKey(data));
      if (!previousData)
        throw {
          message: `Cache access attempy returned undefined`,
          queryKey: queryKey(data),
        };

      mutation &&
        queryClient.setQueryData<T>(queryKey(data), oldData =>
          mutation(oldData as T, data, queryClient),
        );

      return previousData;
    },
    onError: (_error, data, context) => {
      if (!queryKey) return;
      queryClient.setQueryData(queryKey(data), context);
    },
    onSettled: (_d, error, data) => {
      //optional queries to refetch
      invalidateKeys?.(data).map(async key => {
        await queryClient.invalidateQueries(key);
      });

      if (error) throw error;
      if (!queryKey) return;
      void queryClient.invalidateQueries(queryKey(data)); //main query
    },
  });
};

export default useAppMutation;
