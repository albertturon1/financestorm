const request = async <T>(url: string, config?: RequestInit) => {
  try {
    const response = await fetch(url, config);

    if (!response.ok) throw new Error(response.statusText);
    return response.json() as Promise<T>;
  } catch (err) {
    console.warn(err);
  }
};

const api = {
  get: <T>(url: string, config?: RequestInit) =>
    request<T | undefined>(url, { method: 'GET', ...config }),
  post: <TBody extends BodyInit, TResponse>(
    url: string,
    body: TBody,
    config?: RequestInit,
  ) => request<TResponse | undefined>(url, { method: 'POST', body, ...config }),
};

export default api;
