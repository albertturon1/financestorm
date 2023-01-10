import {
  CurrentCurrencyRatePairResponse,
  RealtimeCurrencyExchangeRateModified,
} from '@interfaces/api/ICurrenctyRateApi';
import { getFloatBetweenRange, removeNumberFromKey } from '@utils/misc';
import { useCurrentCurrencyRatePairQuery } from 'src/api/CurrenctyRateApi';

export type CurrencyPair = CurrencyResponse | undefined;
export interface CurrenciesPairs {
  pln_usd: CurrencyPair;
  pln_gbp: CurrencyPair;
  pln_chf: CurrencyPair;
  pln_eur: CurrencyPair;
}

export interface CurrencyResponse {
  present: RealtimeCurrencyExchangeRateModified;
  past: RealtimeCurrencyExchangeRateModified;
}

const LOW_RANGE = 0;
const HIGH_RANGE = 0.05;

export const extractCurrencyData = (
  data: CurrentCurrencyRatePairResponse | undefined,
): CurrencyResponse | undefined => {
  const modifiedObject: RealtimeCurrencyExchangeRateModified = {};

  if (!data || !data['Realtime Currency Exchange Rate']) return;
  for (const [key, value] of Object.entries(
    data['Realtime Currency Exchange Rate'],
  )) {
    const newKey = removeNumberFromKey(key);
    if (
      newKey === 'ask_price' ||
      newKey === 'bid_price' ||
      newKey === 'exchange_rate'
    )
      modifiedObject[newKey] = Number(value);
    else modifiedObject[newKey] = (value as string).toLowerCase();
  }
  const sign = Math.random() > 0.5 ? 1 : -1;
  const fieldValue = (field: number) =>
    field + sign * getFloatBetweenRange(LOW_RANGE, HIGH_RANGE);

  const prevDay: RealtimeCurrencyExchangeRateModified = {
    ...modifiedObject,
    ask_price: fieldValue(modifiedObject.ask_price),
    bid_price: fieldValue(modifiedObject.bid_price),
    exchange_rate: fieldValue(modifiedObject.exchange_rate),
  };

  return { present: modifiedObject, past: prevDay };
};

const useCurrentCurrencyRatesData = (): readonly [
  CurrenciesPairs | undefined,
  boolean,
] => {
  const { data: pln_usd, isLoading: isPlnUSDLoading } =
    useCurrentCurrencyRatePairQuery({
      baseCurrency: 'USD',
      quoteCurrency: 'PLN',
    });
  const { data: pln_gbp, isLoading: isPLNBGPLoading } =
    useCurrentCurrencyRatePairQuery({
      baseCurrency: 'GBP',
      quoteCurrency: 'PLN',
    });
  const { data: pln_eur, isLoading: isPLNEURLoading } =
    useCurrentCurrencyRatePairQuery({
      baseCurrency: 'EUR',
      quoteCurrency: 'PLN',
    });
  const { data: pln_chf, isLoading: isPLNCHFLoading } =
    useCurrentCurrencyRatePairQuery({
      baseCurrency: 'CHF',
      quoteCurrency: 'PLN',
    });

  const isLoading =
    isPlnUSDLoading ?? isPLNBGPLoading ?? isPLNEURLoading ?? isPLNCHFLoading;

  return [
    pln_chf && pln_eur && pln_gbp && pln_usd
      ? {
          pln_chf: extractCurrencyData(pln_chf),
          pln_eur: extractCurrencyData(pln_eur),
          pln_gbp: extractCurrencyData(pln_gbp),
          pln_usd: extractCurrencyData(pln_usd),
        }
      : undefined,
    isLoading,
  ] as const;
};
export default useCurrentCurrencyRatesData;
