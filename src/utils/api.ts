const request = async <T>(
  url: string,
  config?: RequestInit,
) => {
  try {
    const response = await fetch(url, {
      ...config,
      headers: {
        "Content-Type": "text/plain",
      },
    });
    if (!response.ok) throw new Error(response.statusText);

    return response.json() as Promise<T>;
  }
  catch (err) {
    console.warn(err)
    throw Error(err as string);
  }
};

const api = {
  get: <T>(url: string, config?: RequestInit) => request<T>(url, { method: 'GET', ...config }),
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody, config?: RequestInit) =>
    request<TResponse>(url, { method: 'POST', body, ...config }),
};

export default api;
