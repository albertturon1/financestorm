import PageTitle from '@components/PageTitle';
import { CURRENCIES } from '@constants/currencies';
import { PADDING_TAILWIND } from '@constants/Globals';
import CurrencyTile from '@features/currencies/compoonents/CurrencyTile';
import { Currencies } from '@interfaces/ICurrency';
import { ExchangeRateLatestResponseRates } from '@interfaces/models/IExchangerate';

import { getTodayCurrencyRatesQuery } from '../../../src/api/CurrenctyRateApi';

export type CurrencyTileRates = {
  baseCurrency: Currencies;
  rate: number;
};

const normalizedRates = (
  rates: ExchangeRateLatestResponseRates | undefined,
) => {
  if (!rates) return [];
  return Object.entries(rates).map(
    ([key, value]) =>
      ({
        baseCurrency: key,
        rate: value ** -1,
      } as CurrencyTileRates),
  );
};

export type CurrenciesCurrencyProps = { currency: Currencies };

const Currencies = async ({ params }: { params: CurrenciesCurrencyProps }) => {
  const data = await getTodayCurrencyRatesQuery({
    base_currencies: CURRENCIES,
    quote_currency: params.currency,
  });
  const rates = normalizedRates(data?.rates);

  return (
    <div className={`h-full w-full ${PADDING_TAILWIND}`}>
      <PageTitle>{`Dzisiejsze kursy walut w stosunku do ${params.currency}`}</PageTitle>
      <div className="grid auto-cols-max grid-cols-1 gap-5 pt-5 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {rates.map((rate) => (
          <CurrencyTile
            baseCurrency={rate.baseCurrency}
            quoteCurrency={params.currency}
            rate={rate.rate}
            key={rate.baseCurrency}
          />
        ))}
      </div>
    </div>
  );
};

export default Currencies;
