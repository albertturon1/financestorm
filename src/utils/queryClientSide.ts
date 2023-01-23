export const makeQueryClient = <T>() => {
  const fetchMap = new Map<string, Promise<T>>();

  return function queryClient<QueryResult>(
    name: string,
    query: () => Promise<QueryResult>,
  ): Promise<QueryResult> {
    if (!fetchMap.has(name)) {
      fetchMap.set(name, query());
    }
    return fetchMap.get(name);
  };
};

const queryClientSide = makeQueryClient();
export default queryClientSide;
