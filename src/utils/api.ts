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

  if (res.status === 401) {
    alert('Please login again to use the service');
    console.error('Please login again to use the service');

    return {
      ok: false,
      data: null,
      res: res,
    };
  }

  if (!res.ok) throw new Error(res.statusText);

  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return {
      ok: true,
      data: await res.json(),
      res: res,
    };
  }

  return {
    ok: false,
    data: null,
    res: res,
  };
};
