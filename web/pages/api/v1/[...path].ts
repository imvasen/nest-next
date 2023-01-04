import { IncomingMessage, ServerResponse } from 'http';
import { getSession } from '@web/lib/session';
import { API_URL } from '@web/lib/constants';

type CustomIncomingMessage = IncomingMessage & { query: { path?: string[] } };

export default async function handler(
  req: CustomIncomingMessage,
  res: ServerResponse,
) {
  const input = req.query.path?.join('/') || '';
  const session = await getSession();

  const response = await fetch(`${API_URL}/api/v1/${input}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(session
        ? { Authorization: `Bearer ${session.apiToken}` }
        : undefined),
    },
    // body: init?.body ? JSON.stringify(init.body) : undefined,
  });

  res.end(JSON.stringify(await response.json().catch(() => ({}))));

  // return {
  // status: response.status,
  // data: (await response.json().catch(() => ({}))) as T,
  // };

  // return {};
}
