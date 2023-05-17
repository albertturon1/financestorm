import {
  CURRENCIES,
  DEFAULT_QUOTE_CURRENCY,
  OECD_COUNTRIES,
} from '@constants/currencies';

export type Currency = (typeof CURRENCIES)[number];
export type DefaultCurrency = typeof DEFAULT_QUOTE_CURRENCY;
export type CurrencyExceptDefault = Exclude<Currency, DefaultCurrency>;
export type CurrenciesPair = `${Currency}-${Currency}`;
export type IndexCurrency = {
  name: Currency;
  id: number;
};

export type OECDCountryCode =
  (typeof OECD_COUNTRIES)[keyof typeof OECD_COUNTRIES];
