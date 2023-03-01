import { BiChevronDown } from 'react-icons/bi';

const CheckboxListDefaultHeader = ({
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
    className={`flex h-12 items-center px-4 ${open ? 'border-b' : ''}`}
  >
    <p className="w-full font-semibold tabular-nums">{title}</p>
    <BiChevronDown
      color="#10668E"
      className={`h-12 w-12 transition-transform duration-150 ${
        open ? 'rotate-180' : ''
      }`}
    />
  </button>
);

export default CheckboxListDefaultHeader;
