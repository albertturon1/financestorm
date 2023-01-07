import Flag from 'react-world-flags';

import { CurrencyPair } from '@features/main/hooks/useCurrencyRatesData';

const FLAGS = {
  PLN: 'pl',
  EUR: 'EU',
  USD: 'usa',
  CHF: 'che',
  GBP: 'gbr',
};

const CurrencyRateListItem = ({ item }: { item: CurrencyPair }) => {
  if (!item) return null;
  console.log(item);
  return (
    <div className="grid items-center w-full h-10 grid-cols-5">
      <FlagCountryCode code={item.From_Currency_Code} />
      <p>{item.Exchange_Rate}</p>
      <p>{item.Last_Refreshed}</p>
    </div>
  );
};

const FlagCountryCode = ({ code }: { code: string }) => (
  <div className="flex items-center gap-x-1">
    <div className="w-10 mr-1">
      <Flag
        name={code.toUpperCase()}
        alt={`${code.toUpperCase()} flag`}
        code={FLAGS[code as keyof typeof FLAGS]}
      />
    </div>
    <p className="font-semibold">{`${code}`}&nbsp;</p>
  </div>
);

export default CurrencyRateListItem;
