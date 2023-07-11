import Fastify from 'fastify';
import { setupCustomErrorHandler } from './handlers/customErrorHandler';
import { setupDecorators } from './setup/decorators';
import { setupPlugins } from './setup/plugins';
import { setupRoutes } from './setup/routes';
import { setupGracefulShutdown } from '@/setup/shutdown';
import type { Dependencies } from '@/types';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyServerOptions } from 'fastify';

export function createServer(deps: Dependencies) {
  return async (opts?: FastifyServerOptions) => {
    const app = Fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

    setupCustomErrorHandler(app);
    setupGracefulShutdown(app)(deps);
    setupDecorators(app);

    await setupPlugins(app);
    await setupRoutes(app)(deps);

    return app;
  };
}
