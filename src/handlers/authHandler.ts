import { NotAuthorizedError } from '@/errors';
import { authorizedUserPayload } from '@/utils';
import type {
  FastifyRequest,
  FastifyReply,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
} from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userId: () => string;
  }
}

export function authHandler(): preHandlerHookHandler {
  return (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    const { accessToken } = request.cookies;
    if (!accessToken) {
      throw new NotAuthorizedError();
    }

    const userPayload = authorizedUserPayload(accessToken);
    if (!userPayload) {
      reply.setCookie('accessToken', '', { path: '/' });
      throw new NotAuthorizedError();
    }

    request.userId = () => userPayload.id;

    done();
  };
}
