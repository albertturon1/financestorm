'use client';

import { useState, ChangeEvent } from 'react';

import FlagInput from '@components/misc/FlagInput';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponseRates } from '@interfaces/models/IExchangerate';
import { cutNumber, inverseCurrecyRate } from '@utils/misc';

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
    if (baseCurrency.toUpperCase() in dayRates) {
      latestDayWithRate = inverseCurrecyRate(
        dayRates[baseCurrency.toUpperCase() as Currency],
      );
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

  function handleBaseCurrencyChange({ target }: ChangeEvent<HTMLInputElement>) {
    const { valueAsNumber } = target;
    setBaseCurrencyAmount(valueAsNumber);
    setQuoteCurrencyAmount(valueAsNumber * currencyRate);
  }

  function handleQuoteCurrencyChange({
    target,
  }: ChangeEvent<HTMLInputElement>) {
    const { valueAsNumber } = target;
    setQuoteCurrencyAmount(valueAsNumber);
    setBaseCurrencyAmount(valueAsNumber / currencyRate);
  }

  return (
    <div className="flex w-full flex-col justify-center gap-y-4">
      <FlagInput
        amount={cutNumber(baseCurrencyAmount, 3)}
        currency={baseCurrency.toUpperCase() as Currency}
        onChange={handleBaseCurrencyChange}
      />
      <FlagInput
        amount={cutNumber(quoteCurrencyAmount, 3)}
        currency={quoteCurrency.toUpperCase() as Currency}
        onChange={handleQuoteCurrencyChange}
      />
    </div>
  );
};

export default CurrenciesPairConverter;
