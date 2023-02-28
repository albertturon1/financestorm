import { CURRENCIES } from '@constants/currencies';
import { Currencies } from '@interfaces/ICurrency';

export interface IndexCurrency {
  name: Currencies;
  id: number;
}

const currenciesWithIndex = (currencies: readonly Currencies[]) =>
  CURRENCIES.reduce((acc, item, index) => {
    const included = currencies.includes(item);
    if (!included) return acc;
    return [...acc, { id: index, name: item }];
  }, [] as IndexCurrency[]);

export default currenciesWithIndex;
