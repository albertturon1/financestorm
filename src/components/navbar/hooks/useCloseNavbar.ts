import { Dispatch, SetStateAction, useEffect } from 'react';

import useWindowSize from '@hooks/useWindowSize';

export const MOBILE_NAVBAR_BREAKPOINT = 640;

export const useCloseNavbar = (
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const { screenWidth } = useWindowSize();

  //hide menu when screen resizes over sm
  useEffect(() => {
    if (screenWidth >= MOBILE_NAVBAR_BREAKPOINT && open !== false)
      setOpen(false);
  }, [open, screenWidth, setOpen]);
};
