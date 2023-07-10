import { encryptPassword } from '@/utils';
import type { RegisterCredentials } from '@/types';
import type { PrismaClient } from '@prisma/client';

export function createUser(prismaInstance: PrismaClient) {
  return async (credentials: RegisterCredentials) => {
    const encryptedPassword = encryptPassword(credentials.password);

    await prismaInstance.user.create({
      data: {
        ...credentials,
        password: encryptedPassword,
      },
    });
  };
}
