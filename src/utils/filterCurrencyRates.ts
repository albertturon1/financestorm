import { Currency } from '@interfaces/ICurrency';
import {
  ExchangeRateTimeseriesResponseRates,
  CurrenciesRates,
} from '@interfaces/models/IExchangerate';

import { objectEntries } from './misc';

type TCurrenciesRates<T extends CurrenciesRates | undefined> =
  T extends CurrenciesRates ? CurrenciesRates : undefined;

//filter currency rates from rates object from 1 day
export function filterDayCurrencyRates<T extends CurrenciesRates | undefined>(
  rates: T,
  base_currencies: Currency[],
) {
  if (!rates) return undefined as TCurrenciesRates<T>;

  const filteredRates: Partial<CurrenciesRates> = {};

  for (const [c, rate] of Object.entries(rates)) {
    const currency = c.toLowerCase() as Currency;
    if (base_currencies.includes(currency)) {
      filteredRates[currency] = rate;
    }
  }

  return filteredRates as TCurrenciesRates<T>;
}

export function filterTimeseriesResponseRates(
  rates: ExchangeRateTimeseriesResponseRates | undefined,
  base_currencies: Currency[],
) {
  return rates
    ? objectEntries(rates).reduce((acc, [day, rates]) => {
        const baseCurrenciesFromDay = filterDayCurrencyRates(
          rates,
          base_currencies,
        );

        acc[day] = baseCurrenciesFromDay;
        return acc;
      }, {} as ExchangeRateTimeseriesResponseRates)
    : undefined;
}
