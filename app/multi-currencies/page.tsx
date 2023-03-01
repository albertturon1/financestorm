import { PADDING_TAILWIND } from '@constants/Globals';
import MultiBaseCurrenciesLineChart from '@features/multi-currencies/components/MultiBaseCurrenciesLineChart';
import MultiCurrenciesPageCurrenciesPickers from '@features/multi-currencies/components/MultiCurrenciesPageCurrenciesPickers';
import MultiCurrenciesPageHeader from '@features/multi-currencies/components/MultiCurrenciesPageHeader';

const MultiCurrenciesPage = () => (
  <div className={`${PADDING_TAILWIND} flex h-full w-full flex-col pb-4`}>
    <div className="flex w-full flex-col justify-between gap-y-3 pb-1 lg:flex-row">
      <MultiCurrenciesPageHeader />
      <MultiCurrenciesPageCurrenciesPickers />
    </div>
    <MultiBaseCurrenciesLineChart />
  </div>
);

export default MultiCurrenciesPage;
