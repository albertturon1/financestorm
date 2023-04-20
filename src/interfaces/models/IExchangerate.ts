import { LabelValue } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { CurrencyRatePair } from '@src/api/interfaces/ICurrenctyRateApi';

export type CurrenciesRates = Record<Currency, number>;
export type LabeledRates = CurrenciesRates & LabelValue;

type MOTD = {
  msg: string;
  url: string;
};
export interface ExchangeRateLatestResponse {
  motd: MOTD;
  success: boolean;
  base: Currency;
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
  quote_currency: Currency;
  base_currencies: Currency[];
  rates_array: ExchangeRateTimeseriesRatesArray[];
};

export interface ExchangeRateTimeseriesNormalized {
  quote_currency: Currency;
  base_currency: Currency;
  start_date: string;
  end_date: string;
  min_value: number;
  max_value: number;
  rates: NormalizedCurrencyExchangeRate[];
}

export type NormalizedCurrencyExchangeRate = LabelValue & CurrencyRatePair;

export type SeparateDailyCurrencyRates = {
  quote_currency: Currency;
  base_currency: Currency;
  rates: LabelValue[];
};
