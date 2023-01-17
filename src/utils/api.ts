export const request = async <T>(
  url: string,
  config?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, config);
  return (await response.json()) as T;
};

const api = {
  get: <T>(url: string, config?: RequestInit) => request<T>(url, config),
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: 'POST', body }),
};

export default api;
