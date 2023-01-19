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

const getMultiLineChartData = async (years = 2) => {
  const start = Date.now();
  const data = await Promise.all(
    ['EUR', 'USD', 'GBP', 'CHF'].map(async (currency) => {
      let previousStartDate = '';

      const responses: LabeledRates[] = [];
      for (let i = 0; i < years; i++) {
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
  const end = Date.now();
  console.log(`Execution time: ${end - start} ms`);

  return data;
};

const HomePage = async () => {
  const data = await getMultiLineChartData(18);

  return (
    <div className="flex min-h-0 flex-1 flex-col pb-1 pt-2">
      <SectionTitle>{'Kursy walut w stosunku do PLN'}</SectionTitle>
      <MultiCurrenciesLineChart data={data} />;
    </div>
  );
};

const SectionTitle = ({ children }: { children: string }) => (
  <h1 className="px-5 pb-4 text-lg  font-bold">{children}</h1>
);

export default HomePage;
