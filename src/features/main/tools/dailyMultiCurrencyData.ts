/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Currencies } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesNormalized } from '@interfaces/models/IExchangerate';
import { UserCurrency } from '@interfaces/models/IUser';
import { getDailyCurrencyTimeseries } from '@src/api/CurrenctyRateApiV2';
import {
  CurrencyRateDates,
  CurrencyRatePair,
} from '@src/api/interfaces/ICurrenctyRateApi';
import { getNDaysPastServerDate, previousDate, serverDate } from '@utils/misc';
import normalizeMultiExchangeRateResponse from '@utils/normalizeMultiExchangeRateResponse';

interface Measure {
  currency: string;
  execution_api_time: number;
  execution_time: number;
}

export type DailyMultiCurrencyDataProps = Omit<
  CurrencyRatePair,
  'base_currency'
> & {
  years?: number;
  base_currencies: Currencies[];
};

const dailyMultiCurrencyData = async ({
  years = 1,
  base_currencies, //waluty od których liczysz wartości np EUR/PLN
  quote_currency,
}: DailyMultiCurrencyDataProps): Promise<
  ExchangeRateTimeseriesNormalized[]
> => {
  // eslint-disable-next-line sonarjs/no-unused-collection
  const results: Measure[] = [];
  const function_start = Date.now();

  const data = await Promise.all(
    base_currencies.map(async (currency) => {
      const currency_start = Date.now();
      let previousStartDate = new Date();

      const yearsPairs: CurrencyRateDates[] = [];

      for (let i = 0; i < years; i++) {
        const end_date = previousStartDate;
        //previousStartDate ?? new Date().toISOString().split('T')[0];

        const start_date = previousDate(end_date, 1, undefined, -1);
        previousStartDate = previousDate(end_date, 1);

        yearsPairs.push({
          start_date: serverDate(start_date),
          end_date: serverDate(end_date),
        });
      }

      const api_responses = await Promise.all(
        yearsPairs.map((year) =>
          getDailyCurrencyTimeseries({
            ...year,
            base_currency: currency,
            quote_currency,
          }),
        ),
      );

      const currency_api_end = Date.now();
      const currenciesByYears = normalizeMultiExchangeRateResponse({
        currency_rates: api_responses,
        quote_currency,
      });

      const currency_end = Date.now();
      results.push({
        currency,
        execution_api_time: currency_api_end - currency_start,
        execution_time: currency_end - currency_start,
      });
      return currenciesByYears;
    }),
  );
  const function_end = Date.now();
  //console.log(``);
  //console.log(`Execution time: ${function_end - function_start} ms`);
  //console.log('results" ', results);

  return data;
};

export default dailyMultiCurrencyData;
