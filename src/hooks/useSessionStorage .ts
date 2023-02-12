type StorageType = 'session' | 'local';
type UseStorageReturnValue = {
  getItem: <T>(key: string, type?: StorageType) => T | undefined;
  setItem: (key: string, value: string, type?: StorageType) => boolean;
  removeItem: (key: string, type?: StorageType) => void;
};

const useSessionStorage  = (): UseStorageReturnValue => {
  const storageType = (
    type: StorageType = 'session',
  ): 'localStorage' | 'sessionStorage' => `${type}Storage`;

  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const getItem = <T>(key: string, type?: StorageType) => {
    if (!isBrowser) return;
    const value = window[storageType(type)][key] as string;
    if (!value) return; //empty value;
    return JSON.parse(value) as T;
  };

  const setItem = (key: string, value: string, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  const removeItem = (key: string, type?: StorageType): void => {
    window[storageType(type)].removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useSessionStorage ;
