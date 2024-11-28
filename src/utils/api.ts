export const fetchURL = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);

  if (!res.ok) throw new Error(res.statusText);

  return res.json();
};

export const fetchAPI = async (url: string, options?: RequestInit) => {
  const baseURL =
    process.env.PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;

  const res = await fetch(`${baseURL}${url}`, {
    ...options,
    credentials: 'include',
  });

  if (!res.ok) throw new Error(res.statusText);

  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  return null;
};
