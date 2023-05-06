'use client';

import { Currency } from '@interfaces/ICurrency';
import { cn } from '@utils/misc';

import FlagCountryCode from './FlagCountryCode';
import { ScrollArea, ScrollBar } from '../ui/ScrollArea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../ui/Select';

const CurrenciesSelectList = ({
  currencies,
  triggerClassName,
  showTriggerFocus,
  ...props
}: {
  value: Currency;
  currencies: readonly Currency[];
  onValueChange: (currency: Currency) => void;
  triggerClassName?: string;
  showTriggerFocus?: boolean;
}) => (
  <Select {...props}>
    <SelectTrigger
      className={cn('w-full', triggerClassName)}
      showFocus={showTriggerFocus}
    >
      {props.value && <FlagCountryCode code={props.value} />}
    </SelectTrigger>
    <SelectContent>
      <ScrollArea
        className="flex h-[250px] max-w-full rounded-md border p-2"
        type="always"
      >
        <SelectGroup>
          {currencies.map((currency) => (
            <SelectItem
              value={currency}
              key={currency}
              className="flex w-full items-center space-x-2 py-2"
            >
              <FlagCountryCode code={currency} flagClassName="h-4" />
            </SelectItem>
          ))}
          <ScrollBar />
        </SelectGroup>
      </ScrollArea>
    </SelectContent>
  </Select>
);

export default CurrenciesSelectList;
