'use client';
import PuffLoader from 'react-spinners/PuffLoader';

import useCurrentCurrencyRatesData, {
  CurrencyResponse,
} from '@features/main/hooks/useCurrentCurrencyRatesData';
import { sortObjectByKey } from '@utils/misc';

import CurrenciesRateListItem from './CurrenciesRateListItem';

const CurrenctRatesList = () => {
  const [currencyRatesData, isLoading] = useCurrentCurrencyRatesData();
  const divWidth = 'w-44 xl:w-60 tabular-nums';

  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-4 flex w-full font-semibold">
          <h1 className={divWidth}>{'Nazwa'}</h1>
          <h1 className={divWidth}>{'Bid (PLN)'}</h1>
          <h1 className={divWidth}>{'Ask (PLN)'}</h1>
          <h1 className={divWidth}>{'Kurs (PLN)'}</h1>
          <h1 className={divWidth}>{'Zmiana dzienna (%)'}</h1>
          <h1 className={divWidth}>{'Zmiana dzienna'}</h1>
          <h1 className={divWidth}>{'Ostatnia aktualizacja'}</h1>
        </div>
        {!isLoading ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {currencyRatesData &&
              Object.values(sortObjectByKey(currencyRatesData, 'desc')).map(
                (value, index) => (
                  <CurrenciesRateListItem
                    item={value as CurrencyResponse}
                    className={index % 2 === 0 ? 'bg-secondaryBlack' : ''}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    style={divWidth}
                  />
                ),
              )}
          </>
        ) : (
          <div className="flex w-full items-center justify-center self-center p-10">
            <PuffLoader className="h-full w-full" color={'green'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrenctRatesList;
