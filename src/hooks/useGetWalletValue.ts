import { CurrencyResponse } from '@features/currencies/hooks/useDailyCurrencyRatesData';
import { CurrenciesPairs } from '@features/main/hooks/useCurrentCurrencyRatesData';
import { roundNumber } from '@utils/misc';
import { User } from 'app/user/[id]/page';

const useGetWalletValue = (
  user: User,
  currencyRates: CurrenciesPairs | undefined,
) => {
  const wallet = {
    pln: user.pln,
    usd: user.usd,
    chf: user.chf,
    eur: user.eur,
    gbp: user.gbp,
  };
  const walletInBase = { summary: user.pln, pln: user.pln };
  if (!user || !currencyRates) return { wallet, walletInBase };

  for (const [key, value] of Object.entries(currencyRates)) {
    const [_, currency] = key.split('_');
    const currencyVolume = user[currency];

    const currentExchangeRate =
      (value as CurrencyResponse)?.present.exchange_rate ?? 0;

    const currencyInBase = currencyVolume * currentExchangeRate;
    walletInBase[currency] = currencyInBase;

    walletInBase.summary += currencyInBase;
  }
  return {
    wallet,
    walletInBase: {
      ...walletInBase,
      summary: roundNumber(walletInBase.summary, 3),
    },
  };
};

export default useGetWalletValue;
