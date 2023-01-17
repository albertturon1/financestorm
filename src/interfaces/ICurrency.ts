import { CURRENCIES, CURRENCIES_WITH_PLN } from '@constants/currencies';

export type Currencies = (typeof CURRENCIES)[number];
export type CurrenciesWithPLN = (typeof CURRENCIES_WITH_PLN)[number];
