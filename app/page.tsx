import { PADDING_TAILWIND } from '@constants/Globals';
import CurrenctRatesList from '@features/main/components/CurrencyRates/CurrenctRatesList';

export default function StartingPage() {
  return (
    <div className={`h-full w-full ${PADDING_TAILWIND} pt-5`}>
      <CurrenctRatesList />
    </div>
  );
}
