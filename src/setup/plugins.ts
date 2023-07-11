import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';

export function setupPlugins(app: FastifyInstance) {
  return Promise.all([
    app.register(fastifyCookie),
    app.register(fastifyCors, {
      origin: true,
      credentials: true,
    }),
  ]);
}
