import { LabelValue } from '@interfaces/ICharts';
import { Currencies } from '@interfaces/ICurrency';

export type CurrencyRate = Record<Currencies, number>;
export type LabeledRates = CurrencyRate & LabelValue;

export interface TimeseriesRate {
  [key: string]: CurrencyRate;
}

export interface ExchangeRateTimeseriesResponse {
  motd: string;
  success: boolean;
  timeseries: boolean;
  base: Currencies;
  start_date: string;
  end_date: string;
  rates: TimeseriesRate;
}
export interface ExchangeRateTimeseriesNormalized {
  base: Currencies;
  start_date: string;
  end_date: string;
  min_value: number;
  max_value: number;
  rates: NormalizedCurrencyExchangeRate[];
}

export type NormalizedCurrencyExchangeRate = LabelValue & FromTo;

export interface FromTo {
  from: Currencies;
  to: Currencies;
}
