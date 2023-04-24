import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateLatestResponse } from '@interfaces/models/IExchangerate';

import CurrencyTile from './CurrencyTile';

const CurrenciesRatesTiles = ({
  data,
  quoteCurrencyName,
}: {
  data: ExchangeRateLatestResponse;
  quoteCurrencyName: Currency;
}) => (
  <div className="grid auto-cols-max grid-cols-1 gap-y-3 lg:gap-5 pt-3 pb-2 lg:pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    {Object.entries(data.rates).map(([baseCurrency, rate]) => (
      <CurrencyTile
        currenciesPair={`${baseCurrency as Currency}-${quoteCurrencyName}`}
        rate={rate}
        key={baseCurrency}
      />
    ))}
  </div>
);

export default CurrenciesRatesTiles;
