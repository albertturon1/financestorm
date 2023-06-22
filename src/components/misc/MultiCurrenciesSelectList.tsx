'use client';

import { Currency } from '@interfaces/ICurrency';

import FlagCountryCode from './FlagCountryCode';
import { ScrollArea, ScrollBar } from '../ui/ScrollArea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../ui/Select';

const MultiCurrenciesSelectList = ({
  currencies,
  onValueChange,
  selectedCurrencies,
  ...props
}: {
  values: Currency[];
  currencies: readonly Currency[];
  selectedCurrencies: Currency[];
  onValueChange: (currency: Currency) => void;
}) => (
  <Select {...props}>
    <SelectTrigger className="w-full justify-between">
      <p className="h-full overflow-hidden">
        {props.values
          .map((c) => c.toUpperCase())
          .sort()
          .join(', ')}
      </p>
    </SelectTrigger>
    <SelectContent>
      <ScrollArea
        className="flex h-[250px] max-w-full rounded-md border p-2"
        type="always"
      >
        <SelectGroup>
          {currencies.map((currency) => (
            <button
              className="flex items-center gap-x-3"
              key={currency}
              onClick={() => {
                onValueChange(currency);
              }}
            >
              <input
                readOnly
                type="checkbox"
                checked={selectedCurrencies.includes(currency)}
              />
              <SelectItem
                value={currency}
                className="flex w-full items-center space-x-2 py-2"
              >
                <FlagCountryCode code={currency} flagClassName="h-4" />
              </SelectItem>
            </button>
          ))}
          <ScrollBar />
        </SelectGroup>
      </ScrollArea>
    </SelectContent>
  </Select>
);

export default MultiCurrenciesSelectList;
