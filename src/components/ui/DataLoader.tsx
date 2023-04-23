import { memo, ReactElement } from 'react';

import ErrorMessage from '@components/ErrorMessage';
import Loader from '@components/Loader';

export type LoadingDecoratorProps<T> = {
  isLoading: boolean;
  isFetching?: boolean;
  data: T;
  className?: string;
  error?: unknown;
  children: ((data: NonNullable<T>) => ReactElement | null) | ReactElement;
  customLoader?: ReactElement;
};

const DataLoader = <T,>({
  isLoading,
  data,
  children,
  error,
  isFetching,
  customLoader,
}: LoadingDecoratorProps<T>) => {
  const renderChildren = () =>
    typeof children === 'function'
      ? children(data as NonNullable<T>)
      : children;

  if (isFetching || isLoading) return customLoader ?? <Loader />;
  if (error) {
    return <ErrorMessage />;
  }
  if (data) return renderChildren();
  return null;
};

//loosing generic props
export default memo(DataLoader) as typeof DataLoader;
