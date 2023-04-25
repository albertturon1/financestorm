import { FetchQueryOptions } from '@tanstack/react-query';

import { AnyObject } from './IUtility';

export interface PaginatedDataResponse<T> extends DataResponse<T> {
  meta: Pagination;
}

export interface Pagination {
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  per_page: number;
}
export interface MessageResponse {
  message: string;
}
export interface DataResponse<T> {
  data: T;
}
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
export interface MessageDataResponse<T>
  extends MessageResponse,
    DataResponse<T> {
  errors: [];
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
