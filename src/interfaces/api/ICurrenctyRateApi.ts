export interface CurrencyRatePairRequest {
  baseCurrency: string;
  quoteCurrency: string;
}

export interface RealtimeCurrencyExchangeRate {
  '1. From_Currency Code': string;
  '2. From_Currency Name': string;
  '3. To_Currency Code': string;
  '4. To_Currency Name': string;
  '5. Exchange Rate': string;
  '6. Last Refreshed': string;
  '7. Time Zone': string;
  '8. Bid Price': string;
  '9. Ask Price': string;
}
export interface RealtimeCurrencyExchangeRateModified {
  from_currency_code: string;
  from_currency_name: string;
  to_currency_code: string;
  to_currency_name: string;
  last_refreshed: string;
  exchange_rate: number;
  time_zone: string;
  bid_price: number;
  ask_price: number;
}

export interface CurrentCurrencyRatePairResponse {
  'Realtime Currency Exchange Rate'?: RealtimeCurrencyExchangeRate;
  Note?: string;
}

interface DailyCurrencyRateMeta {
  '1. Information': string;
  '2. From Symbol': string;
  '3. To Symbol': string;
  '4. Output Size': string;
  '5. Last Refreshed': string;
  '6. Time Zone': string;
}
export interface DailyCurrencyRateMetaModified {
  information: string;
  from_symbol: string;
  to_symbol: string;
  output_size: string;
  last_refreshed: string;
  time_zone: string;
}
interface DailyCurrencyRateTimeSeries {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
}

export interface DailyCurrencyRateTimeSeriesModified {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
}
export interface DailyCurrencyRateData
  extends DailyCurrencyRateTimeSeriesModified {
  label: string;
}

export interface DailyCurrencyRateResponse {
  'Meta Data': DailyCurrencyRateMeta;
  'Time Series FX (Daily)': DailyCurrencyRateTimeSeries;
}

export interface DailyCurrencyRateResponseModified {
  meta: DailyCurrencyRateMetaModified;
  time_series: DailyCurrencyRateTimeSeriesModified;
  data: DailyCurrencyRateData[];
}
