import { CURRENCIES, CURRENCIES_WITHOUT_PLN } from '@constants/currencies';

export type Currencies = (typeof CURRENCIES)[number];
export type CurrenciesWithoutPLN = (typeof CURRENCIES_WITHOUT_PLN)[number];
export type CurrencyPair = `${Currencies}_${Currencies}`;
export type CurrencyPairValue = Record<CurrencyPair, number>;
