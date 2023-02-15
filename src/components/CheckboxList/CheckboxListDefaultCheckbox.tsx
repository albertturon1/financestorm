export interface CheckboxListDefaultCheckboxProps {
  checked: boolean;
}

const CheckboxListDefaultCheckbox = ({
  checked,
}: CheckboxListDefaultCheckboxProps) => (
  <input readOnly className="h-6 w-6" type="checkbox" checked={checked} />
);

export default CheckboxListDefaultCheckbox;
