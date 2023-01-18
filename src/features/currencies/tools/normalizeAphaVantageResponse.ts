import {
  CurrencyRateData,
  CurrencyRateMetaModified,
  CurrencyRateResponseModified,
  CurrencyRateTimeSeriesModified,
  DailyCurrencyRateResponse,
  DailyCurrencyRateTimeSeries,
  MonthlyCurrencyRateResponse,
} from '@src/api/interfaces/ICurrenctyRateApi';
import { removeNumberFromKey, sortObjectByKey } from '@utils/misc';

//const isDailyCurrencyRateResponse = (
//  data: DailyCurrencyRateResponse | MonthlyCurrencyRateResponse,
//): data is DailyCurrencyRateResponse =>
//  (data as DailyCurrencyRateResponse)['Time Series FX (Daily)'] !== undefined;

type CurrencyTypes = DailyCurrencyRateResponse | MonthlyCurrencyRateResponse;

const normalizeAphaVantageResponse = (
  data: CurrencyTypes | undefined,
): CurrencyRateResponseModified | undefined => {
  if (!data || data.Note !== undefined) return;
  const normalizedMeta = {} as CurrencyRateMetaModified;
  const normalizedTimeSeries = {} as CurrencyRateTimeSeriesModified;
  const chartTimeSeriesData: CurrencyRateData[] = [];

  for (const [key, value] of Object.entries(
    data['Meta Data'] as CurrencyTypes,
  )) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    normalizedMeta[removeNumberFromKey(key) as keyof CurrencyRateMetaModified] =
      value;
  }

  const timeSeries =
    'Time Series FX (Monthly)' in data
      ? data['Time Series FX (Monthly)']
      : (data as DailyCurrencyRateResponse)['Time Series FX (Daily)'];

  for (const [key, value] of Object.entries(
    sortObjectByKey(timeSeries as CurrencyTypes, 'asc'),
  )) {
    const convertedValue = {
      label: key,
      currency: data['Meta Data']?.['2. From Symbol']
    } as CurrencyRateData;

    for (const [innerKey, innerValue] of Object.entries(
      value as DailyCurrencyRateTimeSeries,
    )) {
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
