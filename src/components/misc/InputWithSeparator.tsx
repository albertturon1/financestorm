'use client';

import { useState, ChangeEvent, ReactNode } from 'react';

import { Input } from '@components/ui/Input';
import { cn } from '@utils/misc';

export type InputWithSeparatorProps = {
  amount: number | undefined | null;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  className?: string;
};

const InputWithSeparator = ({
  amount,
  onChange,
  children,
  className,
}: InputWithSeparatorProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={cn(
        'focus-visible:ring-ring flex h-full w-full items-center rounded-xl border-[1.5px] pr-3 font-medium hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        focused && 'ring-2 ring-offset-2 hover:border-transparent',
        className,
      )}
    >
      <Input
        type="number"
        numberHideArrows
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        showFocus={false}
        value={!amount || isNaN(amount) ? '' : amount.toString()}
        onChange={onChange}
        className="w-[10%] min-w-[100px] max-w-[150px] border-0 pl-3 focus:outline-none"
      />
      <div className="h-6 w-[1.2px] bg-border" />
      {children}
    </div>
  );
};

export default InputWithSeparator;
