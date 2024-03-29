'use client';

import { useState, ReactNode } from 'react';

import { Input, InputProps } from '@components/ui/Input';
import { cn } from '@utils/misc';

export type InputWithSeparatorProps = {
  children: ReactNode;
  className?: string;
} & InputProps;

const InputWithSeparator = ({
  children,
  className,
  ...props
}: InputWithSeparatorProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        'focus-visible:ring-ring flex h-full min-h-[40px] w-full items-center rounded-xl border-[1.5px] pr-3 font-medium hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        focused && 'ring-2 ring-offset-2 hover:border-transparent',
        className,
      )}
    >
      <Input
        type="number"
        {...props}
        numberHideArrows
        onFocus={(event) => {
          setFocused(true);
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          props.onBlur?.(event);
        }}
        showFocus={false}
        className="w-[10%] min-w-[130px] max-w-[170px] border-0 pl-3 focus:outline-none"
      />
      <div className="h-6 w-[1.2px] bg-border" />
      {children}
    </div>
  );
};

export default InputWithSeparator;
