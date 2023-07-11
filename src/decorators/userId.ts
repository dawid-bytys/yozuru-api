import { PropertyAccessError } from '@/errors';
import type { FastifyInstance } from 'fastify';

export function decorateUserId(app: FastifyInstance) {
  app.decorateRequest('userId', () => {
    throw new PropertyAccessError('userId');
  });
}
