import { CustomDropdownListRenderItem } from '@components/customDropdownList/CustomDropdownList';
import CustomDropdownListDefaultItemSelector, {
  CustomDropdownListDefaultItemSelectorProps,
} from '@components/customDropdownList/CustomDropdownListDefaultItemSelector';
import FlagCountryCode from '@components/FlagCountryCode';

import { IndexCurrency } from '../tools/currenciesWithIndex';

type Props = {
  onClick: () => void;
} & CustomDropdownListRenderItem<IndexCurrency> &
  CustomDropdownListDefaultItemSelectorProps;

const MultiCurrenciesDropdownCurrenciesItem = ({
  item,
  onClick, 
  index,
  ...props
}: Props) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-x-5 border-t px-4 py-2 ${
      index === 0 ? 'border-t-0' : ''
    }`}
  >
    <CustomDropdownListDefaultItemSelector {...props} />
    <FlagCountryCode code={item.name} />
  </div>
);

export default MultiCurrenciesDropdownCurrenciesItem;
