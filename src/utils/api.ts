import { config } from '@/config';

export const fetchURL = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);

  if (!res.ok) throw new Error(res.statusText);

  return res.json();
};

export const fetchAPI = async (url: string, options?: RequestInit) => {
  const res = await fetch(`${config.server.url}${url}`, options);

  if (!res.ok) throw new Error(res.statusText);

  return res.json();
};
