'use client';

import CurrenciesSelectList from '@components/misc/CurrenciesSelectList';
import InputWithSeparator, {
  InputWithSeparatorProps,
} from '@components/misc/InputWithSeparator';
import { CURRENCIES } from '@constants/currencies';
import { Currency } from '@interfaces/ICurrency';

const WalletQuoteCurrencyInputSelect = ({
  currency,
  onInputChange,
  onCurrencyChange,
  ...props
}: {
  onInputChange: InputWithSeparatorProps['onChange'];
  onCurrencyChange: (newQuoteCurrency: Currency) => void;
  currency: Currency;
} & Omit<InputWithSeparatorProps, 'onChange' | 'children'>) => (
  <InputWithSeparator {...props} onChange={onInputChange}>
    <CurrenciesSelectList
      showTriggerFocus={false}
      triggerClassName="border-0 pr-0 w-full pl-10 self-end justify-end"
      value={currency}
      currencies={CURRENCIES.filter((c) => c !== currency)}
      onValueChange={onCurrencyChange}
    />
  </InputWithSeparator>
);

export default WalletQuoteCurrencyInputSelect;
