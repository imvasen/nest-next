import { PUBLIC_URL } from '@web/lib/constants';

export interface ApiFetchResponse<T> {
  status: number;
  data: T;
}

/**
 * Communicates with the API. It assumes the API returns JSON objects.
 * @param input Same as fetch.
 * @param init Same as fetch.
 * @returns A parsed object.
 */
export async function apiFetch<T = unknown, U = unknown>(
  input: RequestInfo | URL,
  init?: Omit<RequestInit, 'body'> & { body?: U },
): Promise<ApiFetchResponse<T>> {
  const response = await fetch(`${PUBLIC_URL}/api/v1${input}`, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });

  return {
    status: response.status,
    data: (await response.json().catch(() => ({}))) as T,
  };
}
