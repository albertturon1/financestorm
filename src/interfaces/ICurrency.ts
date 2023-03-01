import { CURRENCIES } from '@constants/Currencies';

export type Currencies = (typeof CURRENCIES)[number];
export type CurrenciesPair = `${Currencies}-${Currencies}`;
