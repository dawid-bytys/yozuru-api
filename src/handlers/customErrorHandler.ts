import { CustomError } from '@/errors';
import { errorResponse, isPrismaError } from '@/utils';
import type { FastifyInstance } from 'fastify';

export function setupCustomErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err, _request, reply) => {
    if (isPrismaError(err)) {
      switch (err.code) {
        case 'P2002':
          const constraint = (err.meta!.target as string[])[0] as string;
          return reply.code(409).send(errorResponse(`Provided ${constraint} is already in use.`));
        default:
          return reply.code(500).send(errorResponse(err.message));
      }
    }

    if (err instanceof CustomError) {
      return reply.code(err.statusCode).send(errorResponse(err.message));
    }

    if (err.validation) {
      return reply.code(403).send(errorResponse(err.message));
    }

    //return reply.code(500).send(errorResponse('Unexpected error has occured.'));
    return reply.code(500).send(errorResponse(err.message));
  });
}
