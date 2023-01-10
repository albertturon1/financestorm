import { PADDING_TAILWIND } from '@constants/Globals';
import CurrenciesRatesList from '@features/main/components/CurrencyRates/CurrenciesRatesList';
import RealTimeTransactions from '@features/main/components/RealTimeTransactions';

const StartingPage = () => (
  <div className={`h-full w-full ${PADDING_TAILWIND}`}>
    <div>
      <SectionTitle>{'Kursy walut'}</SectionTitle>
      <CurrenciesRatesList />
    </div>
    <div className="mt-16">
      <SectionTitle>{'Ostatnie transakcje w systemie'}</SectionTitle>
      <RealTimeTransactions />
    </div>
  </div>
);

const SectionTitle = ({ children }: { children: string }) => (
  <h1 className="pb-4 text-lg font-bold">{children}</h1>
);

export default StartingPage;
