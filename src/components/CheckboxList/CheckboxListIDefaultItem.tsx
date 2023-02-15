import CheckboxListDefaultCheckbox, {
  CheckboxListDefaultCheckboxProps,
} from './CheckboxListDefaultCheckbox';

export type CheckboxListIDefaultItemProps = {
  onClick: () => void;
  label: string;
} & CheckboxListDefaultCheckboxProps;
const CheckboxListIDefaultItem = ({
  label,
  onClick,
  checked,
}: CheckboxListIDefaultItemProps) => (
  <button
    className="flex w-full items-center gap-x-3 border-t px-5 py-2"
    onClick={onClick}
  >
    <CheckboxListDefaultCheckbox checked={checked} />
    <p className="text-lg">{label}</p>
  </button>
);

export default CheckboxListIDefaultItem;
