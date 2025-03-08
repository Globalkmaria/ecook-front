export const fetchURL = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);

  if (!res.ok) throw new Error(res.statusText);

  return res.json();
};

export interface FetchAPIOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined | null>;
}

export const fetchAPI = async <T>(
  url: string,
  options: FetchAPIOptions = {},
): Promise<
  | {
      ok: boolean;
      data: T;
      res: Response;
    }
  | {
      ok: false;
      data: null;
      res: Response;
    }
> => {
  const baseURL =
    process.env.PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;

  const qs = toQueryString(options.query);
  const finalURL = `${baseURL}${url}${qs}`;

  const res = await fetch(finalURL, {
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

  // 200 and 299
  const contentType = res.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return {
      ok: true,
      data: await res.json(),
      res: res,
    };
  }

  if (res.ok) {
    return {
      ok: true,
      data: null as unknown as T,
      res: res,
    };
  }

  throw new Error(`Error: ${res.status}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toQueryString(query?: Record<string, any>) {
  if (!query) return '';

  const queryParts: string[] = [];

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    queryParts.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(String(value)),
    );
  }

  return queryParts.length ? '?' + queryParts.join('&') : '';
}
