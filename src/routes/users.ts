import { createUser } from '@/domain/users/createUser';
import { getUserById } from '@/domain/users/getUser';
import { updateEmail } from '@/domain/users/updateEmail';
import { updatePassword } from '@/domain/users/updatePassword';
import {
  EmailsMatchError,
  InvalidPasswordError,
  PasswordsMatchError,
  UserNotFoundError,
} from '@/errors';
import { authHandler } from '@/handlers/authHandler';
import { emailChangeSchema } from '@/schemas/users/emailChangeSchema';
import { passwordChangeSchema } from '@/schemas/users/passwordChangeSchema';
import { userRegisterSchema } from '@/schemas/users/userRegisterSchema';
import { comparePasswords } from '@/utils';
import { get } from 'http';
import type { Dependencies } from '@/types';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyInstance } from 'fastify';

export function usersRoute(deps: Dependencies) {
  const { prisma } = deps;

  return async (app: FastifyInstance) => {
    app.withTypeProvider<TypeBoxTypeProvider>().route({
      method: 'POST',
      url: '/users',
      schema: userRegisterSchema,
      handler: async (request, reply) => {
        await createUser(prisma)(request.body);

        return reply.code(200).send({
          success: true,
          message: 'You have successfully registered.',
        });
      },
    });

    app.withTypeProvider<TypeBoxTypeProvider>().route({
      method: 'PATCH',
      url: '/users/me/password',
      preHandler: authHandler(),
      schema: passwordChangeSchema,
      handler: async (request, reply) => {
        const userId = request.userId();
        const { newPassword } = request.body;

        const user = await getUserById(prisma)(userId);
        if (comparePasswords(newPassword, user.password)) {
          throw new PasswordsMatchError();
        }

        await updatePassword(prisma)(userId, newPassword);

        return reply.code(204).send({
          success: true,
          message: 'Your password has been successfully changed.',
        });
      },
    });

    app.withTypeProvider<TypeBoxTypeProvider>().route({
      method: 'PATCH',
      url: '/users/me/email',
      preHandler: authHandler(),
      schema: emailChangeSchema,
      handler: async (request, reply) => {
        const userId = request.userId();
        const { newEmail } = request.body;

        const user = await getUserById(prisma)(userId);
        if (user.email === newEmail) {
          throw new EmailsMatchError();
        }

        await updateEmail(prisma)(userId, newEmail);

        return reply.code(204).send({
          success: true,
          message: 'Your e-mail has been successfully changed.',
        });
      },
    });
  };
}
