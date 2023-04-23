import { DateTime } from 'luxon';

import { SERVER_DATE } from '@constants/dateTime';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseries } from '@interfaces/models/IExchangerate';
import { getDailyCurrencyTimeseriesOneYearQuery } from '@src/api/CurrenctyRateApi';
import {
  CurrencyRateRange,
  CurrencyRatePair,
} from '@src/api/interfaces/ICurrenctyRateApi';
import { dateDiff } from '@utils/misc';

export type DailyMultiCurrencyDataProps = Omit<
  CurrencyRatePair,
  'base_currency'
> & {
  start_date?: string;
  end_date?: string;
  base_currencies: Currency[];
  years?: number;
};

const dailyCurrencyTimeseriesYears = async ({
  base_currencies, //waluty od których liczysz wartości np EUR/PLN
  quote_currency,
  start_date,
  years = 1,
  end_date = DateTime.now().toFormat(SERVER_DATE),
}: DailyMultiCurrencyDataProps) => {
  const startDate =
    start_date ??
    DateTime.fromISO(end_date).minus({ years, days: -1 }).toFormat(SERVER_DATE);

  const { years: y } = dateDiff(startDate, end_date, 'years');
  const yearsNum = years ?? Math.ceil(y ?? 1);
  const yearsPairs: CurrencyRateRange[] = [];
  let currentEndDate = DateTime.fromISO(end_date).toFormat(SERVER_DATE);

  for (let i = 0; i < yearsNum; i++) {
    if (i === yearsNum - 1) {
      yearsPairs.push({
        start_date: startDate,
        end_date: currentEndDate,
      });
      break;
    }

    const loopStartDate = DateTime.fromISO(currentEndDate)
      .minus({ years: 1, day: -1 })
      .toFormat(SERVER_DATE);

    yearsPairs.push({
      start_date: loopStartDate,
      end_date: currentEndDate,
    });

    currentEndDate = DateTime.fromISO(currentEndDate)
      .minus({ years: 1 })
      .toFormat(SERVER_DATE);
  }

  const api_responses = await Promise.all(
    yearsPairs.map((dates) =>
      getDailyCurrencyTimeseriesOneYearQuery({
        ...dates,
        base_currencies,
        quote_currency,
      }),
    ),
  );

  return api_responses.filter(Boolean).reduce((acc, item, index) => {
    // eslint-disable-next-line no-param-reassign
    if (index === 0) acc = item;
    else {
      acc.end_date = end_date;
      acc.start_date = startDate;
      acc.rates = { ...acc.rates, ...item.rates };
      acc.rates_array = acc.rates_array.concat(item.rates_array);
    }
    return acc;
  }, {} as ExchangeRateTimeseries);
};

export default dailyCurrencyTimeseriesYears;
