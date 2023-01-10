import { genQueryString, isObjectEmpty } from '../misc';

export const urlBuilder = (url: string, params?: object) => {
  if (!url) throw 'no url in urlBuilder';
  if (isObjectEmpty(params)) return url;
  return `${url}?${genQueryString({ ...params })}`;
};
