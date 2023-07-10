import { usersRoute } from '@/routes/users';
import type { Dependencies } from '@/types';
import type { FastifyInstance } from 'fastify';

export function setupRoutes(deps: Dependencies) {
  return async (app: FastifyInstance) => {
    await app.register(usersRoute(deps), { prefix: '/api' });
  };
}
