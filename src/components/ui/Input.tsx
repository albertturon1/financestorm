import * as React from 'react';

import { cn } from '@utils/misc';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    showFocus?: boolean;
    numberHideArrows?: boolean;
  }
>(
  (
    { className, type, showFocus = true, numberHideArrows = true, ...props },
    ref,
  ) => (
    <input
      {...props}
      type={type}
      className={cn(
        'border-input w-fullborder flex h-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50',
        showFocus &&
          'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        type === 'number' &&
          numberHideArrows &&
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
        className,
      )}
      ref={ref}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
