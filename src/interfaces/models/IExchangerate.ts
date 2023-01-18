import { Currencies } from '@interfaces/ICurrency';

type Rates = Record<Currencies, number>;
export type LabeledRates = Rates & { label: string };

export interface TimeseriesRate {
  [key: string]: Partial<Rates>;
}

export interface ExchangerateTimeseriesResponse {
  motd: string;
  success: boolean;
  timeseries: boolean;
  base: Currencies;
  start_date: string;
  end_date: string;
  rates: TimeseriesRate[];
}
