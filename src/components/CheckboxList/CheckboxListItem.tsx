const CheckboxListItem = ({
  label,
  onClick,
  checked,
}: {
  label: string;
  onClick: () => void;
  checked?: boolean;
}) => (
  <button
    className="flex w-full items-center gap-x-3 border-t px-5 py-2"
    onClick={onClick}
  >
    <input
      readOnly
      className="h-5 w-5"
      type="checkbox"
      name={label}
      checked={checked}
    />
    <p className="text-lg">{label}</p>
  </button>
);

export default CheckboxListItem;
