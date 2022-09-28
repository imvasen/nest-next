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
export async function apiFetch<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<ApiFetchResponse<T>> {
  const response = await fetch(input, init);
  return {
    status: response.status,
    data: (await response.json().catch(() => ({}))) as T,
  };
}
