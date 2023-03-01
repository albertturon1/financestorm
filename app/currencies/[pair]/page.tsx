import { DateTime } from 'luxon';

import FlagCountryCode from '@components/FlagCountryCode';
import { SERVER_DATE } from '@constants/DateTime';
import { PADDING_TAILWIND } from '@constants/Globals';
import CurrenciesBaseQuoteChart from '@features/currencies/compoonents/CurrenciesBaseQuoteChart';
import { Currencies, CurrenciesPair } from '@interfaces/ICurrency';
import { getDailyCurrencyTimeseriesOneYearQuery } from '@src/api/CurrenctyRateApi';

export type CurrenciesPairPageProps = {
  pair: CurrenciesPair;
};

const CurrenciesPairPage = async ({
  params,
}: {
  params: CurrenciesPairPageProps;
}) => {
  const { pair } = params;
  const [currency, quote] = pair.split('-') as [Currencies, Currencies];
  const data = await getDailyCurrencyTimeseriesOneYearQuery({
    quote_currency: quote,
    base_currencies: [currency],
    start_date: DateTime.now().minus({ years: 1 }).toFormat(SERVER_DATE),
    end_date: DateTime.now().toFormat(SERVER_DATE),
  });

  return (
    <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
      <div className="flex w-full justify-between pb-5">
        <div className="flex items-center gap-x-2 text-xl">
          <FlagCountryCode code={currency} className="gap-x-0" />
          <p className="text-2xl font-bold">{'/'}</p>
          <FlagCountryCode code={quote} className="gap-x-0" />
        </div>
      </div>
      <CurrenciesBaseQuoteChart data={data} />
    </div>
  );
};

export default CurrenciesPairPage;
