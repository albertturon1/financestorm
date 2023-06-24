import { Dispatch, SetStateAction, useEffect } from 'react';

import useWindowSize from '@hooks/useWindowSize';

export const useCloseNavbar = (
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const { screenWidth } = useWindowSize();

  //hide menu when screen resizes over sm
  useEffect(() => {
    if (screenWidth >= 640 && open !== false) setOpen(false);
  }, [open, screenWidth, setOpen]);
};
