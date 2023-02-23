import { ChecboxListRenderItem } from '@components/CheckboxList/CheckboxList';
import CheckboxListDefaultCheckbox, {
  CheckboxListDefaultCheckboxProps,
} from '@components/CheckboxList/CheckboxListDefaultCheckbox';
import FlagCountryCode from '@components/FlagCountryCode';

import { IndexCurrency } from '../tools/currenciesWithIndex';

type Props = {
  onClick: (item: IndexCurrency) => void;
} & ChecboxListRenderItem<IndexCurrency> &
  CheckboxListDefaultCheckboxProps;

const CurrenciesCheckboxItem = ({ item, checked, onClick, index }: Props) => (
  <div
    onClick={() => {
      onClick(item);
    }}
    className={`flex items-center gap-x-5 border-t px-4 py-2 ${
      index === 0 ? 'border-t-0' : ''
    }`}
  >
    <CheckboxListDefaultCheckbox checked={checked} />
    <FlagCountryCode code={item.name} />
  </div>
);

export default CurrenciesCheckboxItem;
