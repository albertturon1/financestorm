'use client';

import FlagCountryCode from '@components/misc/FlagCountryCode';
import { Currency } from '@interfaces/ICurrency';

import InputWithSeparator, {
  InputWithSeparatorProps,
} from './InputWithSeparator';

export type FlagInputProps = {
  currency: Currency;
  className?: string;
} & Omit<InputWithSeparatorProps, 'children'>;

const FlagInput = ({ currency, ...props }: FlagInputProps) => (
  <InputWithSeparator {...props}>
    <div className="flex flex-1 items-center justify-end">
      <div className="min-w-[80px]">
        <FlagCountryCode code={currency} />
      </div>
    </div>
  </InputWithSeparator>
);

export default FlagInput;
