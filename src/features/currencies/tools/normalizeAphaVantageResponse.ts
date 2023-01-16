import {
  CurrencyRateData,
  CurrencyRateMetaModified,
  CurrencyRateResponseModified,
  CurrencyRateTimeSeriesModified,
  DailyCurrencyRateResponse,
  MonthlyCurrencyRateResponse,
} from '@interfaces/api/ICurrenctyRateApi';
import { removeNumberFromKey, sortObjectByKey } from '@utils/misc';

const normalizeAphaVantageResponse = <
  T extends DailyCurrencyRateResponse | MonthlyCurrencyRateResponse,
>(
  data: T | undefined,
  type: 'Daily' | 'Monthly',
): CurrencyRateResponseModified | undefined => {
  if (!data || data.Note !== undefined) return;
  const normalizedMeta = {} as CurrencyRateMetaModified;
  const normalizedTimeSeries = {} as CurrencyRateTimeSeriesModified;
  const chartTimeSeriesData: CurrencyRateData[] = [];

  for (const [key, value] of Object.entries(data['Meta Data'])) {
    normalizedMeta[removeNumberFromKey(key)] = value;
  }
  for (const [key, value] of Object.entries(
    sortObjectByKey(data[`Time Series FX (${type})`]),
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
  } as CurrencyRateResponseModified;
};

export default normalizeAphaVantageResponse;
