import { DateValue } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';

export type CurrenciesRates = Record<Currency, number>;

type MOTD = {
  msg: string;
  url: string;
};
export type ExchangeRateLatestResponse = {
  motd: MOTD;
  success: boolean;
  base: Currency;
  date: string;
  rates: CurrenciesRates;
};

export type ExchangeRateTimeseriesResponseRates = {
  [key: string]: CurrenciesRates;
};

export type ExchangeRateTimeseriesResponse = Omit<
  ExchangeRateLatestResponse,
  'rates' | 'date'
> & {
  timeseries: boolean;
  start_date: string;
  end_date: string;
  rates: ExchangeRateTimeseriesResponseRates;
};

export type ExchangeRateTimeseriesRatesArray = {
  date: string;
  rates: CurrenciesRates;
};

export type SeparateDailyCurrencyRates = {
  quote_currency: Currency;
  base_currency: Currency;
  rates: DateValue[];
};
