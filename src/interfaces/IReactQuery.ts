import {UseQueryOptions} from '@tanstack/react-query';

import {QueryError} from './IApi';

export type QueryKeyT = (string | number)[];
export type QueryConfig<T> = UseQueryOptions<T, QueryError, T, QueryKeyT>;
