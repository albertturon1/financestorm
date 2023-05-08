import { CURRENCIES, DEFAULT_QUOTE_CURRENCY } from '@constants/currencies';

export type Currency = (typeof CURRENCIES)[number];
export type DefaultCurrency = typeof DEFAULT_QUOTE_CURRENCY;
export type CurrencyExceptDefault = Exclude<Currency, DefaultCurrency>;
export type CurrenciesPair = `${Currency}-${Currency}`;
export type IndexCurrency = {
  name: Currency;
  id: number;
};
