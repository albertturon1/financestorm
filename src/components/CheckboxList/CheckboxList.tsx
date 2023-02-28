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

import CustomDropdown from '@components/CustomDropdown';
import { includedInGenericArray } from '@utils/misc';

import CheckboxListDefaultHeader from './CheckboxListDefaultHeader';
import CheckboxListItem from './CheckboxListIDefaultItem';

type CustomComponent<T> = (data: T) => ReactElement | null;
export type ChecboxListRenderItem<T> = {
  item: T;
  index: number;
};
export type ChecboxListRenderHeader = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type CheckboxListProps<T> = {
  items: T[];
  activeItems: T[];
  nameExtractor: (value: T) => string;
  keyExtractor: (value: T) => number | string;
  onClick?: (value: T) => void;
  className?: string;
  title: string;
  renderItem?: CustomComponent<ChecboxListRenderItem<T>>;
  renderHeader?: CustomComponent<ChecboxListRenderHeader>;
};

const CheckboxList = <T,>({
  items,
  activeItems,
  nameExtractor,
  keyExtractor,
  onClick,
  className = '',
  title = '',
  renderItem,
  renderHeader,
}: CheckboxListProps<T>) => {
  //add imprerative hadler to scroll to top
  const scrollRef = useRef<Scrollbars>(null);

  const ChecboxListRenderHeader = useCallback(
    (open: boolean, setOpen: Dispatch<SetStateAction<boolean>>) =>
      isValidElement(renderHeader)
        ? renderHeader
        : renderHeader?.({ open, setOpen }),
    [renderHeader],
  );

  const ChecboxListRenderItem = useCallback(
    (props: ChecboxListRenderItem<T>) =>
      isValidElement(renderItem) ? renderItem : renderItem?.(props),
    [renderItem],
  );

  return (
    <CustomDropdown className={className}>
      {({ open, setOpen }) => (
        <>
          {ChecboxListRenderHeader(open, setOpen) ?? (
            <CheckboxListDefaultHeader
              open={open}
              title={title}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            />
          )}
          {/*itemsList*/}
          <div
            className={`absolute top-12 z-10 w-full flex-col overflow-hidden bg-secondaryBlack  ${
              open ? 'h-96 max-h-max' : 'h-0'
            }`}
          >
            <Scrollbars
              className="flex"
              universal
              ref={scrollRef}
              style={{ color: 'white' }}
            >
              {items.map((item, index) => (
                <div key={keyExtractor(item)}>
                  {ChecboxListRenderItem({ item, index }) ?? (
                    <CheckboxListItem
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

const Memo = memo(CheckboxList);
export default Memo as typeof CheckboxList;
