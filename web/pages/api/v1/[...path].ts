import { IncomingMessage, ServerResponse } from 'http';
import { unstable_getServerSession } from 'next-auth';
import { API_URL } from '@web/lib/constants';
import { authOptions } from '@web/lib/auth';

type CustomIncomingMessage = IncomingMessage & {
  query: { path?: string[] };
  body: object;
  cookies: Partial<{ [key: string]: string }>;
};

export default async function handler(
  req: CustomIncomingMessage,
  res: ServerResponse,
) {
  const input = req.query.path?.join('/') || '';
  const session = await unstable_getServerSession(req, res, authOptions);

  const response = await fetch(`${API_URL}/api/v1/${input}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(session
        ? { Authorization: `Bearer ${session.apiToken}` }
        : undefined),
    },
    method: req.method,
    body:
      req.body && req.method !== 'GET' && req.method !== 'HEAD'
        ? JSON.stringify(req.body)
        : undefined,
  });

  res.writeHead(response.status, response.statusText);
  res.end(JSON.stringify(await response.json().catch(() => ({}))));
}
