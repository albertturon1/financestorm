import PageTitle from '@components/PageTitle';
import { CURRENCIES } from '@constants/currencies';
import { PADDING_TAILWIND } from '@constants/Globals';
import CurrencyTile from '@features/currencies/compoonents/CurrencyTile';
import { Currencies } from '@interfaces/ICurrency';
import { ExchangeRateLatestResponseRates } from '@interfaces/models/IExchangerate';

import { getTodayCurrencyRatesQuery } from '../../../src/api/CurrenctyRateApi';

const normalizedRates = (rates: ExchangeRateLatestResponseRates) =>
  Object.entries(rates).map(([key, value]) => ({
    base_currenncy: key,
    rate: value ** -1,
  }));

export type CurrenciesCurrencyProps = { currency: Currencies };

const Currencies = async ({ params }: { params: CurrenciesCurrencyProps }) => {
  const data = await getTodayCurrencyRatesQuery({
    base_currencies: CURRENCIES,
    quote_currency: params.currency,
  });
  const rates = normalizedRates(data.rates);

  return (
    <div className={`h-full w-full ${PADDING_TAILWIND}`}>
      <PageTitle>{`Dzisiejsze kursy walut w stosunku do ${params.currency}`}</PageTitle>
      <div className="grid grid-cols-1 gap-5 pt-5 pb-4 auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {rates.map((rate) => (
          <CurrencyTile
            baseCurrency={rate.base_currenncy}
            quoteCurrency={params.currency}
            rate={rate.rate}
            key={rate.base_currenncy}
          />
        ))}
      </div>
    </div>
  );
};

export default Currencies;
