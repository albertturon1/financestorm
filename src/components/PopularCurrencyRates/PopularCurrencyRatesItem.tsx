import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import FlagCountryCode from '@components/FlagCountryCode';
import { SeparateDailyCurrencyRates } from '@interfaces/models/IExchangerate';
import { cutNumber, valuesDifferenceInPercentage } from '@utils/misc';

import PopularCurrencyRatesItemChart from './PopularCurrencyRatesItemChart';

export function chartColor(rates: number[]) {
  const differenceInPercentage = valuesDifferenceInPercentage(rates);
  if (differenceInPercentage < 0) return 'rgb(220 38 38)'; //red
  if (differenceInPercentage > 0) return 'rgb(21 128 61)'; //green
  return 'rgb(55 65 81)';
}

export const PopularCurrencyRatesItem = ({
  currencyRates,
  columnsStyle,
  changeStyle,
  chartStyle,
  amountStyle,
  currencyStyle,
}: {
  currencyRates: SeparateDailyCurrencyRates;
  columnsStyle: string;
  changeStyle: string;
  chartStyle: string;
  amountStyle: string;
  currencyStyle: string;
}) => {
  const values = currencyRates.rates.map((r) => r.value);
  const differenceInPercentage = cutNumber(
    valuesDifferenceInPercentage(values),
    3,
  );

  return (
    <div className={columnsStyle}>
      <div className={currencyStyle}>
        <FlagCountryCode code={currencyRates.base_currency} />
      </div>
      <p className={amountStyle}>{currencyRates.rates.slice(-1)[0].value}</p>
      <p
        className={changeStyle}
        style={{
          color: chartColor(values),
        }}
      >{`${differenceInPercentage}%`}</p>
      <div className={`${chartStyle} h-full w-full`}>
        <PopularCurrencyRatesItemChart rates={currencyRates.rates} />
      </div>
      <div className="col-span-1 flex h-full w-full items-center justify-end">
        <Link
          href={`/`}
          className="flex h-full items-center justify-center px-3"
        >
          <button className="flex flex-1 items-center justify-center">
            <ChevronRight color="#0B2447" size={25} />
          </button>
        </Link>
      </div>
    </div>
  );
};
