'use client';

import { useState, ChangeEvent } from 'react';

import FlagCountryCode from '@components/misc/FlagCountryCode';
import { Input } from '@components/ui/Input';
import { Currency } from '@interfaces/ICurrency';
import { ExchangeRateTimeseriesResponseRates } from '@interfaces/models/IExchangerate';
import { cn, cutNumber, inverseCurrecyRate } from '@utils/misc';

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
      latestDayWithRate = inverseCurrecyRate(dayRates[baseCurrency]);
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
      <Row
        amount={cutNumber(baseCurrencyAmount, 3)}
        currency={baseCurrency}
        onChange={handleBaseCurrencyChange}
      />
      <Row
        amount={cutNumber(quoteCurrencyAmount, 3)}
        currency={quoteCurrency}
        onChange={handleQuoteCurrencyChange}
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
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={cn(
        'focus-visible:ring-ring flex h-full w-full items-center rounded-xl border-2 pr-3 font-medium hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        focused && 'ring-2 ring-offset-2 hover:border-transparent',
      )}
    >
      <Input
        type="number"
        numberHideArrows
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        showFocus={false}
        value={isNaN(amount) ? '' : amount.toString()}
        onChange={onChange}
        className="w-[10%] min-w-[100px] max-w-[150px] border-0 pl-3 focus:outline-none"
      />
      <div className="h-6 w-[0.5px] bg-border" />
      <div className="flex flex-1 items-center justify-end">
        <div className="min-w-[80px]">
          <FlagCountryCode code={currency} />
        </div>
      </div>
    </div>
  );
};

export default CurrenciesPairConverter;
