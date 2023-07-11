import { isProd } from '@/config';
import { getUserById, getUserByUsername } from '@/domain/users/getUser';
import { mapUserToDto } from '@/dto-mappers/user';
import { InvalidCredentialsError, UserNotFoundError } from '@/errors';
import { authHandler } from '@/handlers/authHandler';
import { meSchema } from '@/schemas/sessions/meSchema';
import { userLoginSchema } from '@/schemas/users/userLoginSchema';
import { comparePasswords, generateAccessToken } from '@/utils';
import type { Dependencies } from '@/types';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyInstance } from 'fastify';

export function sessionsRoute(deps: Dependencies) {
  const { prisma } = deps;

  return async (app: FastifyInstance) => {
    app.withTypeProvider<TypeBoxTypeProvider>().route({
      method: 'POST',
      url: '/sessions',
      schema: userLoginSchema,
      handler: async (request, reply) => {
        const { username, password } = request.body;

        const user = await getUserByUsername(prisma)(username);
        if (!user || !comparePasswords(password, user.password)) {
          throw new InvalidCredentialsError();
        }

        const accessToken = generateAccessToken(user.id, '24h');

        return reply
          .setCookie('accessToken', accessToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: isProd,
            maxAge: 60 * 60 * 24,
          })
          .send({
            success: true,
            message: 'You have successfully logged in.',
          });
      },
    });

    app.withTypeProvider<TypeBoxTypeProvider>().route({
      method: 'GET',
      url: '/sessions/me',
      preHandler: authHandler(),
      schema: meSchema,
      handler: async (request, reply) => {
        const userId = request.userId();

        const user = await getUserById(prisma)(userId);
        if (!user) {
          throw new UserNotFoundError();
        }

        return reply.send({
          success: true,
          data: mapUserToDto(user),
        });
      },
    });
  };
}
