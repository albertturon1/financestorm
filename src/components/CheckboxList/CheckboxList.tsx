import { memo, useState } from 'react';

import { some } from 'lodash';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { BiChevronDown } from 'react-icons/bi';

import CheckboxListItem from './CheckboxListItem';

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
      {/*button*/}
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className={`flex h-12 items-center px-4 ${open ? 'border-b' : ''}`}
      >
        <p className="w-full text-lg font-semibold">{title}</p>
        <BiChevronDown
          color="#10668E"
          className={`h-10 w-10 transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {/*itemsList*/}
      <div
        className={`absolute top-12 z-10 w-full flex-col overflow-hidden bg-secondaryBlack  ${
          open ? 'h-60' : 'h-0'
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

const Memo = memo(CheckboxList);
export default Memo as typeof CheckboxList;
