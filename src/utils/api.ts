export const fetchURL = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);

  if (!res.ok) throw new Error(res.statusText);

  return res.json();
};

export const fetchAPI = async (
  url: string,
  options?: RequestInit,
): Promise<{
  ok: boolean;
  data: any;
  res: Response;
}> => {
  const baseURL =
    process.env.PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;

  const res = await fetch(`${baseURL}${url}`, {
    ...options,
    credentials: 'include',
  });

  if (405 <= res.status && res.status <= 500) {
    throw new Error('Server Error');
  }

  if (300 <= res.status && res.status <= 404) {
    return {
      ok: false,
      data: null,
      res: res,
    };
  }

  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return {
      ok: true,
      data: await res.json(),
      res: res,
    };
  }

  // 200 and 299
  if (res.ok) {
    return {
      ok: true,
      data: null,
      res: res,
    };
  }

  throw new Error(`Error: ${res.status}`);
};
