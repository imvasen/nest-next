import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '@web/lib/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const statusResponse = await fetch(`${API_URL}/api/v1/status`);
  res.status(statusResponse.status).json(await statusResponse.json());
}
