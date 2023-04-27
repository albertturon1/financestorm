'use client';

import { ReactElement } from 'react';

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

const CurrenciesSelectList = ({
  title,
  currencies,
  ...props
}: {
  title: string | (() => ReactElement);
  value: Currency;
  currencies: readonly Currency[];
  onValueChange: (currency: Currency) => void;
}) => (
  <Select {...props}>
    <SelectTrigger className="w-full">
      {typeof title === 'string' ? title : title()}
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
