import {
  CurrencyRatePairRequest,
  RealtimeCurrencyExchangeRateModified,
} from '@interfaces/api/ICurrenctyRateApi';
import { useDailyCurrencyRatePairQuery } from 'src/api/CurrenctyRateApi';

import normalizeAphaVantageResponse from '../tools/normalizeAphaVantageResponse';

export interface CurrencyResponse {
  present: RealtimeCurrencyExchangeRateModified;
  past: RealtimeCurrencyExchangeRateModified;
}

const useDailyCurrencyRatesData = (params: CurrencyRatePairRequest) => {
  const dailyCurrencyRatePair = useDailyCurrencyRatePairQuery(params);

  const normalizedData = normalizeAphaVantageResponse(
    dailyCurrencyRatePair.data,
    'Daily',
  );
  return [normalizedData, dailyCurrencyRatePair] as const;
};
export default useDailyCurrencyRatesData;
