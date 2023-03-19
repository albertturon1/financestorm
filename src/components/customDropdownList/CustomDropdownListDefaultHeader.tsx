import { BiChevronDown } from 'react-icons/bi';

const CustomDropdownListDefaultHeader = ({
  onClick,
  open,
  title,
}: {
  onClick: () => void;
  open: boolean;
  title: string;
}) => (
  <button
    onClick={onClick}
    className={`flex h-12 items-center justify-between pl-4 pr-1 ${open ? 'border-b' : ''}`}
  >
    <p className="w-max font-semibold tabular-nums">{title}</p>
    <BiChevronDown
      color="#10668E"
      className={`h-12 w-12 transition-transform duration-150 ${
        open ? 'rotate-180' : ''
      }`}
    />
  </button>
);

export default CustomDropdownListDefaultHeader;
