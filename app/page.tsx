import MultiCurrenciesLineChart from '@components/MultiCurrenciesLineChart';
import { PADDING_TAILWIND } from '@constants/Globals';
import { Currencies } from '@interfaces/ICurrency';
import { LabeledRates } from '@interfaces/models/IExchangerate';
import { getDailyCurrencyTimeseries } from '@src/api/CurrenctyRateApiV2';

//export const revalidate = 3600; // revalidate every hour

const getPreviousYearDate = (date: string) => {
  const previousYear = Number(date.split('-')[0]) - 1;
  const currentMonthDay = date.split('-').slice(1, 3).join('-');
  return [previousYear, currentMonthDay].join('-');
};

const getMultiLineChartData = async () =>
  await Promise.all(
    ['EUR', 'GBP', 'USD', 'CHF'].map(async (currency) => {
      let previousStartDate = '';

      const responses: LabeledRates[] = [];
      for (let i = 0; i < 1; i++) {
        const end_date = !previousStartDate
          ? new Date().toISOString().split('T')[0]
          : previousStartDate;
        const start_date = getPreviousYearDate(end_date);

        previousStartDate = start_date;

        const response = await getDailyCurrencyTimeseries({
          base: currency as Currencies,
          start_date,
          end_date,
          symbols: ['PLN'],
        });

        const normalizedRates: { value: number; lable: string }[] = [];
        for (const [key, value] of Object.entries(response.rates)) {
          if (value.PLN)
            normalizedRates.push({
              value: value.PLN,
              label: key,
              from: currency,
              to: 'PLN',
            });
        }
        responses.unshift(...normalizedRates);
      }
      return { data: responses, name: currency };
    }),
  );

const HomePage = async () => {
  const data = await getMultiLineChartData();

  return <MultiCurrenciesLineChart data={data} />;
};

const SectionTitle = ({ children }: { children: string }) => (
  <h1 className="pb-4 text-lg font-bold">{children}</h1>
);

export default HomePage;
