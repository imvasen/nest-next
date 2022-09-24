import { config } from 'dotenv';
config();

export const DEFAULT_PORT = 3666;

function getPort(port = Number(process.env.PORT)): number {
  return port > 0 && port < 65536 ? port : DEFAULT_PORT;
}

export const PORT = getPort();
