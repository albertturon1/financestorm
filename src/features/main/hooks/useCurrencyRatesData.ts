import {
  CurrencyRatePairResponse,
  RealtimeCurrencyExchangeRateModified,
} from '@interfaces/api/ICurrenctyRateApi';
import { removeNumberFromKey } from '@utils/reactQuery/misc';
import { useCurrencyRatePairQuery } from 'src/api/CurrenctyRateApi';

export type CurrencyPair = RealtimeCurrencyExchangeRateModified | undefined;

export interface CurrenciesPairs {
  pln_usd: CurrencyPair;
  pln_gbp: CurrencyPair;
  pln_chf: CurrencyPair;
  pln_eur: CurrencyPair;
}

const extractCurrencyData = (
  data: CurrencyRatePairResponse | undefined,
): RealtimeCurrencyExchangeRateModified | undefined => {
  const modifiedObject:
    | RealtimeCurrencyExchangeRateModified
    | Record<string, never> = {};

  if (!data || !data['Realtime Currency Exchange Rate']) return;
  for (const [key, value] of Object.entries(
    data['Realtime Currency Exchange Rate'],
  )) {
    modifiedObject[removeNumberFromKey(key)] = value;
  }

  return modifiedObject;
};

const useCurrencyRatesData = () => {
  const { data: pln_usd } = useCurrencyRatePairQuery({
    baseCurrency: 'USD',
    quoteCurrency: 'PLN',
  });
  const { data: pln_gbp } = useCurrencyRatePairQuery({
    baseCurrency: 'GBP',
    quoteCurrency: 'PLN',
  });
  const { data: pln_eur } = useCurrencyRatePairQuery({
    baseCurrency: 'EUR',
    quoteCurrency: 'PLN',
  });
  const { data: pln_chf } = useCurrencyRatePairQuery({
    baseCurrency: 'CHF',
    quoteCurrency: 'PLN',
  });

  return {
    pln_chf: extractCurrencyData(pln_chf),
    pln_eur: extractCurrencyData(pln_eur),
    pln_gbp: extractCurrencyData(pln_gbp),
    pln_usd: extractCurrencyData(pln_usd),
  } as CurrenciesPairs;
};
export default useCurrencyRatesData;
