import MultiCurrenciesLineChart from '@components/MultiCurrenciesLineChart';
import dailyMultiCurrencyData from '@features/main/tools/dailyMultiCurrencyData';

export const revalidate = 3600; // revalidate every hour

const HomePage = async () => {
  const data = await dailyMultiCurrencyData({
    years: 2,
    quote_currency: 'PLN',
    base_currencies: ['USD', 'GBP', 'EUR'],
  });
  const chartData = data.flatMap((d) => ({ name: d.base, data: d.rates }));

  return (
    <div className="flex min-h-0 flex-1 flex-col pb-1 pt-2">
      <SectionTitle>{'Kursy walut w stosunku do PLN'}</SectionTitle>
      <MultiCurrenciesLineChart data={chartData} />;
    </div>
  );
};

const SectionTitle = ({ children }: { children: string }) => (
  <h1 className="px-5 pb-4 text-lg  font-bold">{children}</h1>
);

export default HomePage;
