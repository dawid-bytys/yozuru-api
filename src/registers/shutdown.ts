import { SIGNALS } from '@/constants';
import type { Dependencies } from '@/types';
import type { FastifyInstance } from 'fastify';

export function setupGracefulShutdown(deps: Dependencies) {
  return async (app: FastifyInstance) => {
    for (const signal of SIGNALS) {
      process.on(signal, () => {
        app.log.info(`Received ${signal}, shutting down...`);
        app.close();
        deps.prisma.$disconnect();
        app.log.info('Server closed!');
      });
    }
  };
}
