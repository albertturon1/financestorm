import { CustomDropdownListRenderItemProps } from '@components/customDropdownList/CustomDropdownList';
import CustomDropdownListDefaultItemSelector, {
  CustomDropdownListDefaultItemSelectorProps,
} from '@components/customDropdownList/CustomDropdownListDefaultItemSelector';
import FlagCountryCode from '@components/FlagCountryCode';
import { IndexCurrency } from '@features/multi-currencies/tools/currenciesWithIndex';

type Props = {
  onClick: () => void;
} & CustomDropdownListRenderItemProps<IndexCurrency> &
  CustomDropdownListDefaultItemSelectorProps;

const CurrencyDropdownItem = ({
  item,
  onClick,
  index,
  ...props
}: Props) => (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-x-5 border-t px-4 py-2 ${
        index === 0 ? 'border-t-0' : ''
      }`}
    >
      <CustomDropdownListDefaultItemSelector {...props} />
      <FlagCountryCode code={item.name} />
    </button>
  );

export default CurrencyDropdownItem;
