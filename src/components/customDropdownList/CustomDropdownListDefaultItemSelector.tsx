import { HTMLInputTypeAttribute } from 'react';

export type CustomDropdownListDefaultItemSelectorProps = {
  type?: Extract<HTMLInputTypeAttribute, 'radio' | 'checkbox'>;
  checked: boolean;
};

const CustomDropdownListDefaultItemSelector = (
  props: CustomDropdownListDefaultItemSelectorProps,
) => <input readOnly className="h-6 w-6" {...props} />;

export default CustomDropdownListDefaultItemSelector;
