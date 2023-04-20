import { CURRENCIES } from '@constants/currencies';
import { Currency } from '@interfaces/ICurrency';

export interface IndexCurrency {
  name: Currency;
  id: number;
}

const currenciesWithIndex = (currencies: readonly Currency[]) =>
  CURRENCIES.reduce((acc, item, index) => {
    const included = currencies.includes(item);
    if (!included) return acc;
    return [...acc, { id: index, name: item }];
  }, [] as IndexCurrency[]);

export default currenciesWithIndex;
