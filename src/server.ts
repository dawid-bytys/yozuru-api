import Fastify from 'fastify';
import { setupCustomErrorHandler } from './handlers/customErrorHandler';
import { setupRoutes } from './registers/routes';
import { setupGracefulShutdown } from '@/registers/shutdown';
import type { Dependencies } from '@/types';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyServerOptions } from 'fastify';

export function createServer(deps: Dependencies) {
  return async (opts?: FastifyServerOptions) => {
    const app = Fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

    setupCustomErrorHandler(app);
    setupGracefulShutdown(deps)(app);
    setupRoutes(deps)(app);

    return app;
  };
}
