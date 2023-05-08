import { CURRENCIES } from '@constants/currencies';
import { Currency, IndexCurrency } from '@interfaces/ICurrency';

const currenciesWithIndex = (currencies: readonly Currency[]) =>
  CURRENCIES.reduce((acc, item, index) => {
    const included = currencies.includes(item);
    if (!included) return acc;
    return [...acc, { id: index, name: item }];
  }, [] as IndexCurrency[]);

export default currenciesWithIndex;
