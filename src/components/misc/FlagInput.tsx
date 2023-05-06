'use client';

import { useState, ChangeEvent } from 'react';

import FlagCountryCode from '@components/misc/FlagCountryCode';
import { Input } from '@components/ui/Input';
import { Currency } from '@interfaces/ICurrency';
import { cn } from '@utils/misc';

const FlagInput = ({
  currency,
  amount,
  onChange,
}: {
  currency: Currency;
  amount: number | undefined | null;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={cn(
        'focus-visible:ring-ring flex h-full w-full items-center rounded-xl border-2 pr-3 font-medium hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        focused && 'ring-2 ring-offset-2 hover:border-transparent',
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
      <div className="flex flex-1 items-center justify-end">
        <div className="min-w-[80px]">
          <FlagCountryCode code={currency} />
        </div>
      </div>
    </div>
  );
};

export default FlagInput;
