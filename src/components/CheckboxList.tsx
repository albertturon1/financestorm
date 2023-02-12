import { memo, useState } from 'react';

import { some } from 'lodash';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDetectClickOutside } from 'react-detect-click-outside';

const CheckboxList = <T,>({
  items,
  activeItems,
  nameExtractor,
  keyExtractor,
  onBoxClick,
  className = '',
  title = '',
}: {
  items: T[];
  activeItems: T[];
  nameExtractor: (value: T) => string;
  keyExtractor: (value: T) => number;
  onBoxClick: (value: T) => void;
  className?: string;
  title: string;
}) => {
  const [open, setOpen] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setOpen(false);
    },
  });

  return (
    <div
      ref={ref}
      className={`relative flex h-max cursor-pointer flex-col rounded bg-secondaryBlack ${className}`}
    >
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className={`flex h-12 items-center px-5`}
      >
        <p className="w-full text-lg font-semibold">{title}</p>
      </button>
      <div
        className={`absolute top-12 z-10 w-full flex-col overflow-hidden bg-secondaryBlack  ${
          open ? 'h-52' : 'h-0'
        }`}
      >
        <Scrollbars className="flex" universal>
          {items.map((item) => {
            const active =
              typeof item === 'string'
                ? activeItems.includes(item)
                : some(activeItems, item);

            return (
              <CheckboxListItem
                label={nameExtractor(item)}
                key={keyExtractor(item)}
                checked={active}
                onClick={() => {
                  onBoxClick(item);
                }}
              />
            );
          })}
        </Scrollbars>
      </div>
    </div>
  );
};

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

const Memo = memo(CheckboxList);
export default Memo as typeof CheckboxList;
