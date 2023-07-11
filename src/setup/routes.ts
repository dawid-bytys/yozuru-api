import { sessionsRoute } from '@/routes/sessions';
import { usersRoute } from '@/routes/users';
import type { Dependencies } from '@/types';
import type { FastifyInstance } from 'fastify';

export function setupRoutes(app: FastifyInstance) {
  return (deps: Dependencies) => {
    return Promise.all([
      app.register(sessionsRoute(deps), { prefix: '/api' }),
      app.register(usersRoute(deps), { prefix: '/api' }),
    ]);
  };
}
