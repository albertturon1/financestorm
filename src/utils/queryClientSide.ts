import hashQueryKey from './hashQueryKey';

export const makeQueryClient = <T>() => {
  const fetchMap = new Map<string, Promise<T>>();

  return function queryClient<QueryResult>(
    name: (string[] | number[] | string | number)[],
    query: () => Promise<QueryResult>,
  ): Promise<QueryResult> {
    const hashedKey = hashQueryKey(name);
    if (!fetchMap.has(hashedKey)) {
      fetchMap.set(hashedKey, query());
    }
    return fetchMap.get(hashedKey);
  };
};

const queryClientSide = makeQueryClient();
export default queryClientSide;
