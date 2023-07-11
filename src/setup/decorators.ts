import { decorateUserId } from '@/decorators/userId';
import type { FastifyInstance } from 'fastify';

export function setupDecorators(app: FastifyInstance) {
  decorateUserId(app);
}
