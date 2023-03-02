import { Currencies } from '@interfaces/ICurrency';
import { ExchangeRateLatestResponse } from '@interfaces/models/IExchangerate';

import CurrencyTile from './CurrencyTile';

const CurrenciesRatesTiles = ({
  data,
  quoteCurrencyName,
}: {
  data: ExchangeRateLatestResponse;
  quoteCurrencyName: Currencies;
}) => (
  <div className="grid auto-cols-max grid-cols-1 gap-5 pt-5 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    {Object.entries(data.rates).map(([baseCurrency, rate]) => (
      <CurrencyTile
        currenciesPair={`${baseCurrency as Currencies}-${quoteCurrencyName}`}
        rate={rate}
        key={baseCurrency}
      />
    ))}
  </div>
);

export default CurrenciesRatesTiles;
