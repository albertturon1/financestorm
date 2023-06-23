'use client';

import { useState, ChangeEvent } from 'react';

import FlagInput from '@components/misc/FlagInput';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponseRates } from '@interfaces/models/IExchangerate';
import { cutNumber, inverseCurrencyRate, objectEntries } from '@utils/misc';

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
  for (const [_, dayRates] of objectEntries(rates)) {
    if (baseCurrency in dayRates) {
      latestDayWithRate = inverseCurrencyRate(dayRates[baseCurrency]);
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

  if (!currencyRate) return null;
  return (
    <div className="flex w-full max-w-[300px] flex-col gap-y-5 self-center lg:text-lg">
      <h1 className="self-center font-medium">{'Converter'}</h1>
      <Rows {...props} currencyRate={currencyRate} />
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
    const { value } = target;
    const parsedValue = parseFloat(value);

    setBaseCurrencyAmount(parsedValue);
    setQuoteCurrencyAmount(parsedValue * currencyRate);
  }

  function handleQuoteCurrencyChange({
    target,
  }: ChangeEvent<HTMLInputElement>) {
    const { value } = target;
    const parsedValue = parseFloat(value);

    setQuoteCurrencyAmount(parsedValue);
    setBaseCurrencyAmount(parsedValue / currencyRate);
  }
  return (
    <div className="flex w-full flex-col justify-center gap-y-4">
      <FlagInput
        currency={baseCurrency.toUpperCase() as Currency}
        onChange={handleBaseCurrencyChange}
        value={cutNumber(baseCurrencyAmount).toString()} //.toString() to remove leading 0 from value displayed in input
      />
      <FlagInput
        currency={quoteCurrency.toUpperCase() as Currency}
        onChange={handleQuoteCurrencyChange}
        value={cutNumber(quoteCurrencyAmount, 3).toString()}
      />
    </div>
  );
};

export default CurrenciesPairConverter;
