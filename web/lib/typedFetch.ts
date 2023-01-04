import { getSession } from '@web/lib/session';
import { API_URL } from './constants';

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
  // const session = await getSession();

  // const response = await fetch(`${API_URL}/api/v1${input}`, {
  const response = await fetch(`/api/v1${input}`, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
      // ...(session
      //   ? { Authorization: `Bearer ${session.apiToken}` }
      //   : undefined),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });

  return {
    status: response.status,
    data: (await response.json().catch(() => ({}))) as T,
  };
}
