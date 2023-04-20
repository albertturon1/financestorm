import { DateTime } from 'luxon';

import FlagCountryCode from '@components/FlagCountryCode';
import PageTitle from '@components/PageTitle';
import { SERVER_DATE } from '@constants/dateTime';
import { PADDING_TAILWIND } from '@constants/globals';
import CurrenciesBaseQuoteChart from '@features/currencies/compoonents/CurrenciesBaseQuoteChart';
import { Currency, CurrenciesPair } from '@interfaces/ICurrency';
import { getDailyCurrencyTimeseriesOneYearQuery } from '@src/api/CurrenctyRateApi';

export type CurrenciesPairPageProps = {
  pair: CurrenciesPair;
};

const CurrenciesPairPage = async ({
  params,
}: {
  params: CurrenciesPairPageProps;
}) => {
  const [currency, quote] = (params.pair as string).split('-') as [
    Currency,
    Currency,
  ];
  const data = await getDailyCurrencyTimeseriesOneYearQuery({
    quote_currency: quote,
    base_currencies: [currency],
    start_date: DateTime.now().minus({ years: 1 }).toFormat(SERVER_DATE),
    end_date: DateTime.now().toFormat(SERVER_DATE),
  });

  return (
    <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
      <div className="flex w-full items-center pb-5 gap-x-2">
        <PageTitle>{'Kurs'}</PageTitle>
        <div className="flex items-center gap-x-2 text-xl">
          <FlagCountryCode code={currency} className="gap-x-0" />
          <p className="text-2xl font-bold">{'/'}</p>
          <FlagCountryCode code={quote} className="gap-x-0" />
        </div>
      </div>
      {!!data && <CurrenciesBaseQuoteChart data={data} />}
    </div>
  );
};

export default CurrenciesPairPage;
