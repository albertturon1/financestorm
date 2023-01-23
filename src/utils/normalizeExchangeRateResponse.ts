import { Currencies } from '@interfaces/ICurrency';
import {
  ExchangeRateTimeseriesResponse,
  NormalizedCurrencyExchangeRate,
} from '@interfaces/models/IExchangerate';

import { cutNumber } from './misc';

const normalizeExchangeRateResponse = ({
  currency_rates,
  quote_currency,
}: {
  currency_rates: ExchangeRateTimeseriesResponse;
  quote_currency: Currencies;
}) => {
  const normalizedRates: NormalizedCurrencyExchangeRate[] = [];

  for (const [key, value] of Object.entries(currency_rates.rates)) {
    if (value.PLN)
      normalizedRates.push({
        value: cutNumber(value[quote_currency.toUpperCase()], 3),
        label: key,
        from: currency_rates.base,
        to: quote_currency,
      });
  }
  return { ...currency_rates, rates: normalizedRates };
};

export default normalizeExchangeRateResponse;
