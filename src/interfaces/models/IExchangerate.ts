import { DateValue } from '@interfaces/ICharts';
import { Currencies } from '@interfaces/ICurrency';
import { CurrencyRatePair } from '@src/api/interfaces/ICurrenctyRateApi';

export type CurrenciesRates = Record<Currencies, number>;
export type LabeledRates = CurrenciesRates & DateValue;

type MOTD = {
  msg: string;
  url: string;
};
export interface ExchangeRateLatestResponse {
  motd: MOTD;
  success: boolean;
  base: Currencies;
  date: string;
  rates: CurrenciesRates;
}

export interface ExchangeRateTimeseriesResponseRates {
  [key: string]: CurrenciesRates;
}

export interface ExchangeRateTimeseriesResponse
  extends Omit<ExchangeRateLatestResponse, 'rates' | 'date'> {
  timeseries: boolean;
  start_date: string;
  end_date: string;
  rates: ExchangeRateTimeseriesResponseRates;
}

export type ExchangeRateTimeseriesRatesArray = {
  date: string;
  rates: CurrenciesRates;
};

export type ExchangeRateTimeseries = Omit<
  ExchangeRateTimeseriesResponse,
  'base' | 'motd' | 'success'
> & {
  quote_currency: Currencies;
  base_currencies: Currencies[];
  rates_array: ExchangeRateTimeseriesRatesArray[];
};

export interface ExchangeRateTimeseriesNormalized {
  quote_currency: Currencies;
  base_currency: Currencies;
  start_date: string;
  end_date: string;
  min_value: number;
  max_value: number;
  rates: NormalizedCurrencyExchangeRate[];
}

export type NormalizedCurrencyExchangeRate = DateValue & CurrencyRatePair;
