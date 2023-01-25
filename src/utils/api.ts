export const request = async <T>(
  url: string,
  config?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, config);

  if (!response?.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
};

const api = {
  get: <T>(url: string, config?: RequestInit) => request<T>(url, config),
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: 'POST', body }),
};

export default api;
