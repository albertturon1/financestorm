import {
  CurrencyRatePairRequest,
  DailyCurrencyRateResponse,
  DailyCurrencyRateResponseModified,
  RealtimeCurrencyExchangeRateModified,
  DailyCurrencyRateTimeSeriesModified,
  DailyCurrencyRateMetaModified,
  DailyCurrencyRateData,
} from '@interfaces/api/ICurrenctyRateApi';
import { removeNumberFromKey, sortObjectByKey } from '@utils/misc';
import { useDailyCurrencyRatePairQuery } from 'src/api/CurrenctyRateApi';

export interface CurrencyResponse {
  present: RealtimeCurrencyExchangeRateModified;
  past: RealtimeCurrencyExchangeRateModified;
}

const normalizeCurrencyData = (
  data: DailyCurrencyRateResponse | undefined,
): DailyCurrencyRateResponseModified | undefined => {
  if (!data) return;
  const normalizedMeta = {} as DailyCurrencyRateMetaModified;
  const normalizedTimeSeries = {} as DailyCurrencyRateTimeSeriesModified;
  const chartTimeSeriesData: DailyCurrencyRateData[] = [];

  for (const [key, value] of Object.entries(data['Meta Data'])) {
    normalizedMeta[removeNumberFromKey(key)] = value;
  }
  for (const [key, value] of Object.entries(
    sortObjectByKey(data['Time Series FX (Daily)']),
  )) {
    const convertedValue = {
      label: key,
    } as DailyCurrencyRateTimeSeriesModified;

    for (const [innerKey, innerValue] of Object.entries(value)) {
      convertedValue[removeNumberFromKey(innerKey)] = Number(innerValue);
    }
    chartTimeSeriesData.push(convertedValue);
    normalizedTimeSeries[key] = convertedValue;
  }

  return {
    meta: normalizedMeta,
    time_series: normalizedTimeSeries,
    data: chartTimeSeriesData,
  } as DailyCurrencyRateResponseModified;
};

const useDailyCurrencyRatesData = (params: CurrencyRatePairRequest) => {
  const dailyCurrencyRatePair = useDailyCurrencyRatePairQuery(params);

  const normalizedData = normalizeCurrencyData(dailyCurrencyRatePair.data);
  return [normalizedData, dailyCurrencyRatePair] as const;
};
export default useDailyCurrencyRatesData;
