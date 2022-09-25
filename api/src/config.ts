import { config } from 'dotenv';
config();

export const DEFAULT_PORT = 3666;

function getPort(port = Number(process.env.PORT)): number {
  return port > 0 && port < 65536 ? port : DEFAULT_PORT;
}

export const PORT = getPort();

export const LOG_LEVEL = process.env.LOG_LEVEL;
export const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const ENV: string = (() => {
  const env: string = process.env.NODE_ENV;
  return ['test', 'development', 'production'].includes(env)
    ? env
    : 'development';
})();
