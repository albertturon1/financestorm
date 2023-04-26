import * as React from 'react';

import { cn } from '@utils/misc';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    showFocus?: boolean;
  }
>(({ className, type, showFocus = true, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'border-input flex h-full w-full rounded-md border bg-transparent px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50',
      showFocus &&
        'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
