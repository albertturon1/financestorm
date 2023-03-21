import { CURRENCIES } from '@constants/currencies';

export type Currencies = (typeof CURRENCIES)[number];
export type CurrenciesPair = `${Currencies}-${Currencies}`;
