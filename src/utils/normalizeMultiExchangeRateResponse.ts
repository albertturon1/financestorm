import { Currencies } from '@interfaces/ICurrency';
import {
  ExchangeRateTimeseriesNormalized,
  ExchangeRateTimeseriesResponse,
  NormalizedCurrencyExchangeRate,
} from '@interfaces/models/IExchangerate';

import normalizeExchangeRateResponse from './normalizeExchangeRateResponse';

const normalizeMultiExchangeRateResponse = ({
  currency_rates,
  quote_currency,
}: {
  currency_rates: ExchangeRateTimeseriesResponse[];
  quote_currency: Currencies;
}) =>
  currency_rates
    .sort((a, b) => (a.end_date > b.end_date ? 1 : -1))
    .map((range) =>
      normalizeExchangeRateResponse({ currency_rates: range, quote_currency }),
    )
    .reduce(
      (acc, range) => {
        if (!acc.start_date || range.start_date < acc.start_date)
          acc.start_date = range.start_date;
        if (!acc.end_date || range.end_date > acc.end_date)
          acc.end_date = range.end_date;

        acc.base = range.base;

        acc.rates.push(...range.rates);
        return acc;
      },
      {
        base: '',
        start_date: '',
        end_date: '',
        rates: [] as NormalizedCurrencyExchangeRate[],
      } as ExchangeRateTimeseriesNormalized,
    );

export default normalizeMultiExchangeRateResponse;
