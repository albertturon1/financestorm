import { CURRENCIES, DEFAULT_GLOBAL_CURRENCY } from '@constants/currencies';

export type Currency = (typeof CURRENCIES)[number];
export type DefaultCurrency = typeof DEFAULT_GLOBAL_CURRENCY;
export type CurrencyExceptDefault = Exclude<Currency, DefaultCurrency>;
export type CurrenciesPair = `${Currency}-${Currency}`;
