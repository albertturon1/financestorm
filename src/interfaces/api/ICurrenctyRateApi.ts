import { CurrenciesWithPLN } from '@interfaces/ICurrency';

export interface CurrencyRatePairRequest {
  baseCurrency: CurrenciesWithPLN;
  quoteCurrency: CurrenciesWithPLN;
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
export interface CurrencyRateMetaModified {
  information: string;
  from_symbol: string;
  to_symbol: string;
  output_size: string;
  last_refreshed: string;
  time_zone: string;
}
export interface DailyCurrencyRateTimeSeries {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
}

export interface CurrencyRateTimeSeriesModified {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
}
export interface CurrencyRateData extends CurrencyRateTimeSeriesModified {
  label: string;
}

export interface CurrencyRateResponseCommon {
  'Meta Data'?: DailyCurrencyRateMeta;
  Note?: string;
}

export interface DailyCurrencyRateResponse extends CurrencyRateResponseCommon {
  'Time Series FX (Daily)'?: DailyCurrencyRateTimeSeries;
}
export interface MonthlyCurrencyRateResponse
  extends CurrencyRateResponseCommon {
  'Time Series FX (Monthly)'?: DailyCurrencyRateTimeSeries;
}

export interface CurrencyRateResponseModified {
  meta: CurrencyRateMetaModified;
  time_series: CurrencyRateTimeSeriesModified;
  data: CurrencyRateData[];
}
