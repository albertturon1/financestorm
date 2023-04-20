import { CURRENCIES } from '@constants/currencies';

export type Currency = (typeof CURRENCIES)[number];
export type CurrenciesPair = `${Currency}-${Currency}`;
