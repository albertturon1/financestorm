import dailyMultiCurrencyData, {
  DailyMultiCurrencyDataProps,
} from '@features/main/tools/dailyMultiCurrencyData';
import userCurrenciesAmount from '@features/user/tools/userCurrenciesAmount';
import { LabelValue } from '@interfaces/ICharts';
import { UserCurrency } from '@interfaces/models/IUser';
import { cutNumber } from '@utils/misc';

export interface WalletValueOverTime {
  start_date: string;
  end_date: string;
  min_value: number;
  max_value: number;
  rates: LabelValue[];
}

const finder = (acc: WalletValueOverTime, value: number) => {
  if (acc.min_value == -1 || value < acc.min_value) acc.min_value = value;
  if (acc.max_value == -1 || value > acc.max_value) acc.max_value = value;
};

const walletValueOverTime = async ({
  user_currencies,
  quote_currency,
  end_date,
  ...props
}: { user_currencies: UserCurrency[] } & Omit<
  DailyMultiCurrencyDataProps,
  'base_currencies'
>) => {
  const nonQuoteCurrencies = user_currencies
    ?.filter((b) => b.currency !== quote_currency)
    .map((b) => b.currency);

  const currencyRates = await dailyMultiCurrencyData({
    base_currencies: nonQuoteCurrencies,
    quote_currency,
    end_date,
    ...props,
  });
  const currencyAmounts = userCurrenciesAmount(user_currencies);

  //all currencies combined into 1 array
  const ratesOnlyCombined = currencyRates.flatMap((currency) => currency.rates);

  return ratesOnlyCombined.reduce(
    (acc, day) => {
      if (!acc.start_date || day.label < acc.start_date)
        acc.start_date = day.label;
      if (!acc.end_date || day.label > acc.end_date) acc.end_date = day.label;

      const labelIndex = acc.rates.findIndex((a) => a.label === day.label); //searching for existing day in array

      //day is not yet in object
      if (labelIndex === -1) {
        const value =
          day.value * currencyAmounts[day.from] +
          currencyAmounts[quote_currency]; //random currency + currenct_currency

        acc.rates.push({
          label: day.label,
          value: cutNumber(value, 2),
        });

        finder(acc, cutNumber(value, 2));

        return acc;
      } else {
        const currentValue = acc.rates[labelIndex].value;
        const currencyConvertedValue = day.value * currencyAmounts[day.from];
        const value = currentValue + currencyConvertedValue;

        acc.rates[labelIndex] = {
          ...acc.rates[labelIndex], //label
          value: cutNumber(value, 2),
        };

        finder(acc, cutNumber(value, 2));

        return acc;
      }
    },
    {
      start_date: '',
      end_date: '',
      min_value: -1,
      max_value: -1,
      rates: [],
    } as WalletValueOverTime,
  );
};
export default walletValueOverTime;
