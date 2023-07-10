import { createUser } from '@/domain/users/createUser';
import { userRegisterSchema } from '@/schemas/users/userRegisterSchema';
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
  };
}
