import { memo, ReactElement } from 'react';

import ErrorMessage from '@components/misc/ErrorMessage';
import Loader from '@components/misc/Loader';

export type DataLoaderProps<T> = {
  className?: string;
  children: ((data: NonNullable<T>) => ReactElement | null) | ReactElement;
  customLoader?: ReactElement;
} & DataLoaderQueryProps<T>;

export type DataLoaderQueryProps<T> = {
  isInitialLoading: boolean;
  isFetching?: boolean;
  data: T;
  error: unknown;
};

const DataLoader = <T,>({
  isInitialLoading,
  data,
  children,
  error,
  isFetching,
  customLoader,
}: DataLoaderProps<T>) => {
  const renderChildren = () =>
    typeof children === 'function'
      ? children(data as NonNullable<T>)
      : children;

  if (isFetching || isInitialLoading) return customLoader ?? <Loader />;
  if (error) {
    return <ErrorMessage />;
  }
  if (data) return renderChildren();
  return null;
};

//loosing generic props
export default memo(DataLoader) as typeof DataLoader;
