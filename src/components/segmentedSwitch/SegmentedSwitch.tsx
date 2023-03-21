import { isEqual } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { renderChildren, RenderItem } from '@utils/misc';

import SelectedSwitchDefaultButton from './SegmentedSwitchDefaultButton';

export type SegmentedSwitchProps<T> = {
  items: readonly T[] | T[];
  activeItem: T;
  className?: string;
  buttonClassName?: string;
  renderItem?: RenderItem<T>;
  keyExtractor: (value: T) => number | string;
  nameExtractor: (value: T) => string;
  onClick: (value: T) => void;
};

const SegmentedSwitch = <T,>({
  items,
  activeItem,
  onClick,
  keyExtractor,
  nameExtractor,
  className = '',
  buttonClassName = '',
  renderItem,
}: SegmentedSwitchProps<T>) => (
  <div className={twMerge('flex h-max items-center', className)}>
    {items.map(
      (item) =>
        renderChildren(renderItem, item) ?? (
          <SelectedSwitchDefaultButton
            className={buttonClassName}
            active={isEqual(activeItem, item)}
            onClick={onClick}
            title={nameExtractor(item)}
            key={keyExtractor(item)}
            item={item}
          />
        ),
    )}
  </div>
);

export default SegmentedSwitch;
