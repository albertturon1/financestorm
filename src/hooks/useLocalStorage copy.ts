import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';

import { noop } from 'lodash';

import { isBrowser } from '@utils/misc';

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  const initializer = useRef<null | ((key: string) => T)>(null);
  const [state, setState] = useState<T | undefined>(() =>
    initializer.current?.(key),
  );
  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setState(undefined);
  }, [key, setState]);

  const set = useCallback(
    (valOrFunc: SetStateAction<T | undefined>) => {
      let value = '';
      const newState =
        valOrFunc instanceof Function ? valOrFunc(state) : valOrFunc;
      if (typeof newState === 'undefined') return;
      value = JSON.stringify(newState);

      localStorage.setItem(key, value);
      setState(JSON.parse(value) as T);
    },
    [key, state],
  );

  initializer.current = (key: string) => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue !== null) {
        return JSON.parse(localStorageValue) as T;
      } else {
        initialValue && localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue;
    }
  };

  if (!isBrowser) {
    return [initialValue, noop, noop];
  }
  if (!key) {
    throw new Error('useLocalStorage key may not be falsy');
  }

  useLayoutEffect(() => {
    setState(initializer.current?.(key));
  }, [key]);
  return [state, set, remove];
};

export default useLocalStorage;
