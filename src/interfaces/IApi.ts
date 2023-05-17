import { FetchQueryOptions } from '@tanstack/react-query';

import { AnyObject } from './IUtility';

export interface Errors {
  [field: string]: string;
}
export interface ErrorResponse {
  message: string;
  errors?: Errors;
}
export interface APIError {
  data: ErrorResponse;
  status: number;
}

export type QueryError = APIError | undefined;

export type PrefetchRequest<T extends AnyObject<T>> = {
  queryParams: T;
  queryOptions?: Omit<
    FetchQueryOptions,
    | 'initialData'
    | 'queryKey'
    | 'queryFn'
    | 'isDataEqual'
    | 'behavior'
    | 'queryHash'
    | 'structuralSharing'
  >;
};
