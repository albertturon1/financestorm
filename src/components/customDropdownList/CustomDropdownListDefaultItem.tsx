import { HTMLInputTypeAttribute } from 'react';

import CustomDropdownListDefaultItemSelector from './CustomDropdownListDefaultItemSelector';

export type CustomDropdownListDefaultItemProps<T> = {
  onClick?: (v?: T) => void;
  label: string;
  type?: Extract<HTMLInputTypeAttribute, 'radio' | 'checkbox'>;
  checked: boolean;
};

const CustomDropdownListDefaultItem = <T,>({
  label,
  onClick,
  ...props
}: CustomDropdownListDefaultItemProps<T>) => (
    <button
      className="flex w-full items-center gap-x-3 border-t px-5 py-2"
      onClick={() => {
        onClick?.();
      }}
    >
      <CustomDropdownListDefaultItemSelector {...props} />
      <p className="text-lg">{label}</p>
    </button>
  );

export default CustomDropdownListDefaultItem;
