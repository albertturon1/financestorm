import MultiCurrenciesLineChart from '@components/MultiCurrenciesLineChart';
import { CURRENCIES } from '@constants/currencies';
import { PADDING_TAILWIND } from '@constants/Globals';
import normalizeAphaVantageResponse from '@features/currencies/tools/normalizeAphaVantageResponse';
import { CurrencyRateResponseModified } from '@interfaces/api/ICurrenctyRateApi';
import { getDailyCurrencyRatePair, testApi } from '@src/api/CurrenctyRateApiV2';

//export const revalidate = 3600; // revalidate every hour

const getMultiLineChartData = async () => {
  const quoteCurrency = 'pln';

  const baseCurrencyPairs = CURRENCIES.map((currency) =>
    getDailyCurrencyRatePair({
      baseCurrency: currency,
      quoteCurrency,
    }),
  );
  const currencies = await Promise.all(baseCurrencyPairs);

  const normalizedCurrencies = currencies.map((currencyData) =>
    normalizeAphaVantageResponse(currencyData),
  );

  const startMonths = normalizedCurrencies.map(
    (currency) => currency?.data[0].label,
  );
  const endMonths = normalizedCurrencies.map(
    (currency) => currency?.data.slice(-1)[0].label,
  );

  const [startMonth] = startMonths.sort().reverse();
  const [endMonth] = endMonths.sort();

  const filterDates = (currency: CurrencyRateResponseModified | undefined) =>
    currency?.data
      .filter(({ label }) => label > startMonth! && label < endMonth!)
      .reverse();

  return normalizedCurrencies.filter(filterDates);
};

const HomePage = async () => {
  //const normalizedCurrencies = await getMultiLineChartData();
  const data = await testApi();
  console.log(data);

  return (
    <div className={`h-screen w-full ${PADDING_TAILWIND}`}>
      {/*<MultiCurrenciesLineChart data={normalizedCurrencies} />*/}
    </div>
  );
};

const SectionTitle = ({ children }: { children: string }) => (
  <h1 className="pb-4 text-lg font-bold">{children}</h1>
);

export default HomePage;
