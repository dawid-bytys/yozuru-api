export function getEnv(name: 'PORT'): number;
export function getEnv(name: 'NODE_ENV'): 'development' | 'production';
export function getEnv(name: 'JWT_SECRET'): string;
export function getEnv(name: string): string;
export function getEnv(name: string): string | number {
  const value = process.env[name];

  switch (name) {
    case 'PORT':
      return value ? Number(value) : 3000;
    case 'NODE_ENV':
      return value || 'development';
  }

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const isProd = getEnv('NODE_ENV') === 'production';
