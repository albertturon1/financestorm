import { OECD_COUNTRIES } from '@constants/currencies';
import { Timespan } from '@interfaces/ICharts';
import { Currency } from '@interfaces/ICurrency';
import { objectEntries } from '@utils/misc';

import { checkIsOECDFetchEnabledByTimespan } from './WalletChart';

const WalletChartInflationFetchStatus = ({
  isFetching,
  isDataAvailable,
  quoteCurrency,
  timespan,
}: {
  isFetching: boolean;
  isDataAvailable: boolean;
  quoteCurrency: Currency;
  timespan: Timespan;
}) => {
  const currencyCountry = objectEntries(OECD_COUNTRIES).find(
    ([currency]) => currency === quoteCurrency,
  );
  const isOECDDEnabled = checkIsOECDFetchEnabledByTimespan(timespan);
  if (!isOECDDEnabled) return null;
  if (!currencyCountry)
    return (
      <div className="flex w-full items-center gap-x-2 text-sm font-medium">
        <div className="h-3 w-3 rounded-full bg-red-600" />
        <p>{'Inflation data is not available'}</p>
      </div>
    );
  if (isFetching)
    return (
      <div className="flex w-full items-center gap-x-2 text-sm font-medium">
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <p>{'Fetching inflation data'}</p>
      </div>
    );
  //doubled same state to wait for finish fetching of data
  if (!isDataAvailable)
    return (
      <div className="flex w-full items-center gap-x-2 text-sm font-medium">
        <div className="h-3 w-3 rounded-full bg-red-600" />
        <p>{'Inflation data is not available'}</p>
      </div>
    );
  return (
    <div className="flex w-full items-center gap-x-2 text-sm font-medium">
      <div className="h-3 w-3 rounded-full bg-green-500" />
      <p>{'Inflation data is available'}</p>
    </div>
  );
};

export default WalletChartInflationFetchStatus;
