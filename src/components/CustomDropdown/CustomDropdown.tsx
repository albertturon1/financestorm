import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { useDetectClickOutside } from 'react-detect-click-outside';
import { twMerge } from 'tailwind-merge';

type Children = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export interface CustomDropdownProps {
  children: (props: Children) => ReactNode;
  className?: string;
  openOnMount?: boolean;
}

const CustomDropdown = ({
  children,
  className = '',
  openOnMount = false,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(openOnMount);
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setOpen(false);
    },
  });
  return (
    <div
      ref={ref}
      className={twMerge(
        'relative flex h-max cursor-pointer flex-col rounded bg-secondaryBlack',
        className,
      )}
    >
      {children({ open, setOpen })}
    </div>
  );
};

export default CustomDropdown;
