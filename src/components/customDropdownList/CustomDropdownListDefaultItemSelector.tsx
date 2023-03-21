import { HTMLInputTypeAttribute } from 'react';

export type CustomDropdownListDefaultItemSelectorProps = {
  type?: Extract<HTMLInputTypeAttribute, 'radio' | 'checkbox'>;
  checked: boolean;
};

const CustomDropdownListDefaultItemSelector = ({
  type = 'checkbox',
  ...props
}: CustomDropdownListDefaultItemSelectorProps) => <input readOnly className="h-6 w-6" type={type} {...props} />;

export default CustomDropdownListDefaultItemSelector;
