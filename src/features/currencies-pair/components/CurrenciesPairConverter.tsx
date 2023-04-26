'use client';

import { useState, useEffect } from 'react';

import FlagCountryCode from '@components/FlagCountryCode';
import { Input } from '@components/ui/Input';
import { Separator } from '@components/ui/Separator';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponseRates } from '@interfaces/models/IExchangerate';
import { cutNumber } from '@utils/misc';

type CurrenciesPairConverterProps = {
  baseCurrency: Currency;
  quoteCurrency: Currency;
};

function getLatestDayRate(
  rates: ExchangeRateTimeseriesResponseRates | undefined,
  baseCurrency: Currency,
) {
  if (!rates) return undefined;
  let latestDayWithRate: number | undefined = undefined;
  for (const [_, dayRates] of Object.entries(rates)) {
    if (baseCurrency in dayRates) {
      latestDayWithRate = dayRates[baseCurrency];
    }
  }
  return latestDayWithRate;
}

const CurrenciesPairConverter = ({
  rates,
  ...props
}: {
  rates: ExchangeRateTimeseriesResponseRates | undefined;
} & CurrenciesPairConverterProps) => {
  const currencyRate = getLatestDayRate(rates, props.baseCurrency);

  return (
    <div className="flex w-full max-w-[300px] flex-col gap-y-5 self-center lg:text-lg">
      <h1 className="self-center font-medium">{'Converter'}</h1>
      {currencyRate !== undefined && (
        <Rows {...props} currencyRate={currencyRate} />
      )}
    </div>
  );
};
const Rows = ({
  baseCurrency,
  currencyRate,
  quoteCurrency,
}: {
  currencyRate: number;
} & CurrenciesPairConverterProps) => {
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState(1);
  const [quoteCurrencyAmount, setQuoteCurrencyAmount] = useState(
    baseCurrencyAmount * currencyRate,
  );

  useEffect(() => {
    setQuoteCurrencyAmount(baseCurrencyAmount * currencyRate);
  }, [baseCurrencyAmount, currencyRate]);

  useEffect(() => {
    setBaseCurrencyAmount(quoteCurrencyAmount / currencyRate);
  }, [quoteCurrencyAmount, currencyRate]);

  return (
    <div className="flex w-full flex-col justify-center gap-y-1">
      <Row
        amount={cutNumber(baseCurrencyAmount, 3)}
        currency={baseCurrency}
        onChange={setBaseCurrencyAmount}
      />
      <Row
        amount={cutNumber(quoteCurrencyAmount, 3)}
        currency={quoteCurrency}
        onChange={setQuoteCurrencyAmount}
      />
    </div>
  );
};

const Row = ({
  currency,
  amount,
  onChange,
}: {
  currency: Currency;
  amount: number;
  onChange: (value: number) => void;
}) => (
  <div className="flex w-full items-center rounded-xl border-2 pr-3 font-medium h-full">
    <Input
      showFocus={false}
      value={amount}
      onChange={(event) => {
        // onChange(event.target.value);
      }}
      className="w-[10%] min-w-[100px] max-w-[150px] rounded-none border-0 pl-3"
    />
    <div className="bg-border h-6 w-[0.5px]" />
    <div className="flex flex-1 items-center justify-end">
      <div className="min-w-[80px]">
        <FlagCountryCode code={currency} />
      </div>
    </div>
  </div>
);

export default CurrenciesPairConverter;
