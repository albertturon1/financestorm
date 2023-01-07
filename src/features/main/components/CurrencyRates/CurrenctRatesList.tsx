'use client';
import useCurrencyRatesData, {
  CurrencyPair,
} from '@features/main/hooks/useCurrencyRatesData';
import { sortObjectByKey } from '@utils/reactQuery/misc';

import CurrencyRateListItem from './CurrencyRateListItem';

const CurrenctRatesList = () => {
  const currencyRatesData = useCurrencyRatesData();

  return (
    <div>
      <h1 className="pb-4 text-2xl font-semibold">{'Kursy walut'}</h1>
      <div className="flex flex-col gap-y-5">
        <div className="grid w-full grid-cols-5">
          <h1 className="mb-1 font-semibold">{'Waluty'}</h1>
          <h1 className="mb-1 font-semibold">{'Kurs (PLN)'}</h1>
          <h1 className="mb-1 font-semibold">{'Ostatnia aktualizacja'}</h1>
        </div>

        {Object.values(sortObjectByKey(currencyRatesData, 'desc')).map(
          (value, index) => (
            <CurrencyRateListItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              item={value as CurrencyPair}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default CurrenctRatesList;
