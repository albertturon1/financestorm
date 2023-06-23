import DataLoader, { DataLoaderQueryProps } from '@components/ui/DataLoader';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateLatestResponse } from '@interfaces/models/IExchangerate';
import { objectKeys } from '@utils/misc';

import CurrencyTile from './CurrencyTile';

const CurrenciesRatesTiles = ({
  currenciesRates,
  quoteCurrency,
  ...props
}: {
  currenciesRates: ExchangeRateLatestResponse | undefined;
  quoteCurrency: Currency;
} & DataLoaderQueryProps<ExchangeRateLatestResponse | undefined>) => (
  <DataLoader {...props} data={currenciesRates}>
    {(data) => (
      <div className="flex flex-col gap-y-2 ">
        {objectKeys(data.rates).length ? (
          <div className="grid auto-cols-max grid-cols-1 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
            {Object.entries(data.rates).map(
              ([baseCurrency, rate], index, array) => (
                <CurrencyTile
                  baseCurrency={baseCurrency.toLowerCase() as Currency}
                  quoteCurrency={quoteCurrency}
                  rate={rate}
                  key={baseCurrency}
                  className={`border ${index === 0 && 'rounded-t-lg'} ${
                    index === 1 && 'sm:rounded-t-lg'
                  } ${index === 2 && 'lg:rounded-t-lg'} ${
                    index === array.length - 3 && 'lg:rounded-b-lg'
                  } ${index === array.length - 2 && 'sm:rounded-b-lg'} ${
                    index === array.length - 1 && 'rounded-b-lg'
                  }`}
                />
              ),
            )}
          </div>
        ) : (
          <div>{'No matches'}</div>
        )}
      </div>
    )}
  </DataLoader>
);

export default CurrenciesRatesTiles;
