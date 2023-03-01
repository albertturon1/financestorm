import { ChartMultiData } from '@interfaces/ICharts';
import { Currencies } from '@interfaces/ICurrency';
import {
  ExchangeRateTimeseries,
  NormalizedCurrencyExchangeRate,
} from '@interfaces/models/IExchangerate';

const convertDailyCurrencyTimeseriesToChartData = (
  data: ExchangeRateTimeseries | undefined,
) => {
  if (!data) return [];
  return data.rates_array.reduce((acc, day) => {
    const { date, rates } = day;
    Object.entries(rates).forEach(([currency, value]) => {
      const currencyIndexInAcc = acc.findIndex((c) => c.name === currency);
      const obj: NormalizedCurrencyExchangeRate = {
        base_currency: currency as Currencies,
        quote_currency: data.quote_currency,
        value,
        label: date,
      };

      if (currencyIndexInAcc === -1)
        acc.push({
          name: currency,
          //minValue: value,
          //maxValue: value,
          data: [obj],
        });
      else {
        ////set minValue
        //if (value > acc[currencyIndexInAcc].maxValue)
        //  acc[currencyIndexInAcc].maxValue = value;
        ////set maxValue
        //if (value < acc[currencyIndexInAcc].minValue)
        //  acc[currencyIndexInAcc].minValue = value;
        acc[currencyIndexInAcc].data = [...acc[currencyIndexInAcc].data, obj];
      }
    });
    return acc;
  }, [] as ChartMultiData<NormalizedCurrencyExchangeRate>[]);
};

export default convertDailyCurrencyTimeseriesToChartData;
