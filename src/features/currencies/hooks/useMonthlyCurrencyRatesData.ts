import { CurrencyRatePairRequest } from '@interfaces/api/ICurrenctyRateApi';
import { useMonthlyCurrencyRatePairQuery } from 'src/api/CurrenctyRateApi';

import normalizeAphaVantageResponse from '../tools/normalizeAphaVantageResponse';

const useMonthlyCurrencyRatesData = (params: CurrencyRatePairRequest) => {
  const { data: monthlyCurrencyRatePair } =
    useMonthlyCurrencyRatePairQuery(params);

  const normalizedData = normalizeAphaVantageResponse(
    monthlyCurrencyRatePair,
    'Monthly',
  );
  return [normalizedData, monthlyCurrencyRatePair] as const;
};
export default useMonthlyCurrencyRatesData;
