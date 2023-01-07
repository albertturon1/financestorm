import { useQuery } from '@tanstack/react-query';

import { QueryError } from '@interfaces/IApi';
import { QueryConfig, QueryKeyT } from '@interfaces/IReactQuery';
import api from '@utils/api';

import { urlBuilder } from './routeUrlBuilder';

const useFetch = <T>({
  key,
  url,
  params,
  config,
}: {
  key: QueryKeyT;
  url: string;
  params?: object;
  config?: QueryConfig<T>;
}) =>
  useQuery<T, QueryError, T, QueryKeyT>(
    key,
    () => api.get(urlBuilder(url, params)),
    config,
  );

export default useFetch;
