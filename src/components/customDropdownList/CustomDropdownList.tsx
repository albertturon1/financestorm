import {
  Dispatch,
  isValidElement,
  memo,
  ReactElement,
  SetStateAction,
  useCallback,
  useRef,
} from 'react';

import Scrollbars from 'react-custom-scrollbars-2';
import { twMerge } from 'tailwind-merge';

import CustomDropdown from '@components/customDropdown';
import { includedInGenericArray } from '@utils/misc';

import CustomDropdownListDefaultHeader from './CustomDropdownListDefaultHeader';
import CustomDropdownListDefaultItem from './CustomDropdownListDefaultItem';

type CustomComponent<T> = (data: T) => ReactElement | null;

export type CustomDropdownListRenderItemProps<T> = {
  item: T;
  index: number;
};
export type CustomDropdownListHeaderProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type CustomDropdownListProps<T> = {
  items: T[];
  activeItems: T[];
  nameExtractor: (value: T) => string;
  keyExtractor: (value: T) => number | string;
  onClick?: (value: T) => void;
  containerClassName?: string;
  itemsClassName?: string;
  title?: string;
  renderItem?: CustomComponent<CustomDropdownListRenderItemProps<T>>;
  renderHeader?: CustomComponent<CustomDropdownListHeaderProps>;
};

const CustomDropdownList = <T,>({
  items,
  activeItems,
  nameExtractor,
  keyExtractor,
  onClick,
  containerClassName,
  itemsClassName,
  title = '',
  renderItem,
  renderHeader,
}: CustomDropdownListProps<T>) => {
  //add imprerative hadler to scroll to top
  const scrollRef = useRef<Scrollbars>(null);

  const CustomDropdownListHeader = useCallback(
    (open: boolean, setOpen: Dispatch<SetStateAction<boolean>>) =>
      isValidElement(renderHeader)
        ? renderHeader
        : renderHeader?.({ open, setOpen }),
    [renderHeader],
  );

  const CustomDropdownListRenderItem = useCallback(
    (props: CustomDropdownListRenderItemProps<T>) =>
      isValidElement(renderItem) ? renderItem : renderItem?.(props),
    [renderItem],
  );

  return (
    <CustomDropdown className={containerClassName}>
      {({ open, setOpen }) => (
        <>
          {CustomDropdownListHeader(open, setOpen) ?? (
            <CustomDropdownListDefaultHeader
              open={open}
              title={title}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            />
          )}
          {/*itemsList*/}
          <div
            className={twMerge(
              `absolute top-12 z-10 w-full flex-col overflow-hidden bg-secondaryBlack  ${
                open ? 'h-96 max-h-max' : 'h-0'
              }`,
              itemsClassName,
            )}
          >
            <Scrollbars
              className="flex"
              universal
              ref={scrollRef}
              style={{ color: 'white' }}
            >
              {items.map((item, index) => (
                <div key={keyExtractor(item)}>
                  {CustomDropdownListRenderItem({ item, index }) ?? (
                    <CustomDropdownListDefaultItem
                      label={nameExtractor(item)}
                      checked={includedInGenericArray(activeItems, item)}
                      onClick={() => {
                        onClick?.(item);
                      }}
                    />
                  )}
                </div>
              ))}
            </Scrollbars>
          </div>
        </>
      )}
    </CustomDropdown>
  );
};

const Memo = memo(CustomDropdownList);
export default Memo as typeof CustomDropdownList;
