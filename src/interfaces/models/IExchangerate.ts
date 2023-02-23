import { LabelValue } from '@interfaces/ICharts';
import { Currencies } from '@interfaces/ICurrency';

export type CurrencyRate = Record<Currencies, number>;
export type LabeledRates = CurrencyRate & LabelValue;

export type ExchangeRateLatestResponseRates = Record<Currencies, number>;

type MOTD = {
  msg: string;
  url: string;
};
export interface ExchangeRateLatestResponse {
  motd: MOTD;
  success: boolean;
  base: Currencies;
  date: string;
  rates: ExchangeRateLatestResponseRates;
}

export interface ExchangeRateTimeseriesResponseRates {
  [key: string]: CurrencyRate;
}

export interface ExchangeRateTimeseriesResponse
  extends Omit<ExchangeRateLatestResponse, 'rates' | 'date'> {
  timeseries: boolean;
  start_date: string;
  end_date: string;
  rates: ExchangeRateTimeseriesResponseRates;
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
