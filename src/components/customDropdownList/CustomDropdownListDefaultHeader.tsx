import { ReactElement } from 'react';

import { BiChevronDown } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

export type CustomDropdownListDefaultHeaderProps = {
  onClick: () => void;
  open: boolean;
  title: string;
  children?: ReactElement;
  className?: string;
};

const CustomDropdownListDefaultHeader = ({
  onClick,
  open,
  title,
  children,
  className,
}: CustomDropdownListDefaultHeaderProps) => (
  <button
    onClick={onClick}
    className={twMerge(
      `flex h-12 items-center justify-between pl-4 pr-1 ${
        open ? 'border-b' : ''
      }`,
      className,
    )}
  >
    <div className="flex">
      <p className="w-max font-semibold tabular-nums">{title}</p>
    </div>
    {children}
    <BiChevronDown
      color="#10668E"
      className={`h-12 w-12 transition-transform duration-150 ${
        open ? 'rotate-180' : ''
      }`}
    />
  </button>
);

export default CustomDropdownListDefaultHeader;
