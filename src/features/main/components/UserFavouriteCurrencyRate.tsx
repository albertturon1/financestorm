'use client';

// const formatDate = (tickValue: string) => {
//   const date = new Date(tickValue);
//   const month = date.toLocaleString('default', { month: 'short' });
//   return `${month}`;
// };


// eslint-disable-next-line arrow-body-style
const UserFavouriteCurrencyRate = () => {
  // const quoteCurrency = 'PLN';
  // const baseCurrency = 'usd';
  // const { data, isError, isLoading } = useDailyCurrencyRatesQuery({
  //   quote_currency: quoteCurrency,
  //   base_currencies: [baseCurrency],
  //   start_date: DateTime.now().minus({ years: 1 }).toFormat(SERVER_DATE),
  //   end_date: DateTime.now().toFormat(SERVER_DATE),
  // });

  // const [width, setWidth] = useState(0);

  // useEffect(() => {
  //   if (!window) return;
  //   const handleResize = () => setWidth(window.innerWidth);
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // if (isLoading) return <p>Loading</p>;
  // if (isError || !data) return <p>Error</p>;

  // const chartData = data.rates_array.map((d) => ({
  //   label: d.date,
  //   value: d.rates[baseCurrency],
  // }));
  // const chartDataValues = data.rates_array.map((d) => d.rates[baseCurrency]);

  // const yDomain = customLineChartYDomain(chartDataValues);

  return (
    <div className="flex flex-col gap-y-2">
      {/* <CurrenciesChecbkoxList
        currencies={CURRENCIES}
        title={'Chuj'}
        onClick={(v) => {
          console.log(v);
        }}
      /> */}
      {/* <ResponsiveContainer width="100%" height="100%" maxHeight={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            left: -20,
            right: 10,
          }}
        >
          <XAxis
            dataKey="label"
            tickFormatter={formatDate}
          />
          <YAxis domain={yDomain} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
          />
          <Tooltip content={UserFavouriteCurrencyRateTooltip} cursor={false} />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default UserFavouriteCurrencyRate;
