import {useInfiniteQuery} from '@tanstack/react-query';

import {PaginatedDataResponse} from '@interfaces/IApi';
import {QueryKeyT} from '@interfaces/IReactQuery';
import api from '@utils/api';

import {urlBuilder} from './routeUrlBuilder';

const useAppInfiniteQuery = <T>({
  key,
  url,
  params,
}: {
  key: QueryKeyT;
  url: string;
  params?: object;
}) =>
  useInfiniteQuery(
    key,
    ({
      pageParam = 1,
    }: {
      pageParam?: number;
    }): Promise<PaginatedDataResponse<T>> =>
      api.get<PaginatedDataResponse<T>>(
        urlBuilder(url, {page: pageParam, ...params}),
      ),
    {
      getNextPageParam: lastPage => lastPage.meta.next_page ?? undefined,
      select: data => ({
        pages: data.pages.map(page => page.data).flat(),
        pageParams: data.pageParams,
      }),
      keepPreviousData: true,
    },
  );

export default useAppInfiniteQuery;
