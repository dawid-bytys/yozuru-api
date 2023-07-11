import Fastify from 'fastify';
import { setupCustomErrorHandler } from './handlers/customErrorHandler';
import { setupPlugins } from './registers/plugins';
import { setupRoutes } from './registers/routes';
import { setupGracefulShutdown } from '@/registers/shutdown';
import type { Dependencies } from '@/types';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyServerOptions } from 'fastify';

export function createServer(deps: Dependencies) {
  return async (opts?: FastifyServerOptions) => {
    const app = Fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

    setupCustomErrorHandler(app);
    setupGracefulShutdown(app, deps);

    await setupPlugins(app);
    await setupRoutes(app, deps);

    return app;
  };
}
