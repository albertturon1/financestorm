'use client';

import CurrenciesSelectList from '@components/misc/CurrenciesSelectList';
import InputWithSeparator, {
  InputWithSeparatorProps,
} from '@components/misc/InputWithSeparator';
import { Currency } from '@interfaces/ICurrency';

const WalletCurrencyInputSelect = ({
  currentCurrency,
  currencies,
  onInputChange,
  onCurrencyChange,
  ...props
}: {
  onInputChange: InputWithSeparatorProps['onChange'];
  onCurrencyChange: (newQuoteCurrency: Currency) => void;
  currentCurrency: Currency | undefined;
  currencies: Currency[];
} & Omit<InputWithSeparatorProps, 'onChange' | 'children'>) => (
  <InputWithSeparator onChange={onInputChange} {...props}>
    <CurrenciesSelectList
      {...props}
      showTriggerFocus={false}
      triggerClassName="border-0 pr-0 w-full pl-10 self-end justify-end"
      value={currentCurrency}
      currencies={currencies}
      onValueChange={onCurrencyChange}
    />
  </InputWithSeparator>
);

export default WalletCurrencyInputSelect;
