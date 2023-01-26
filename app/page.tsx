import MultiCurrenciesLineChart from '@components/MultiCurrenciesLineChart';
import PageTitle from '@components/PageTitle';
import { PADDING_TAILWIND } from '@constants/Globals';
import dailyMultiCurrencyData from '@features/main/tools/dailyMultiCurrencyData';

export const revalidate = 3600; // revalidate every hour

const HomePage = async () => {
  const data = await dailyMultiCurrencyData({
    years: 1,
    quote_currency: 'PLN',
    base_currencies: ['USD', 'GBP', 'EUR', 'CHF'],
  });
  const chartData = data.flatMap((d) => ({ name: d.base, data: d.rates }));

  return (
    <div
      className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-6`}
    >
      <PageTitle>{'Kursy walut w stosunku do PLN'}</PageTitle>
      <div className="flex h-full flex-col">
        <MultiCurrenciesLineChart data={chartData} />
      </div>
    </div>
  );
};

export default HomePage;
