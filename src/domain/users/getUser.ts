import { UserNotFoundError } from '@/errors';
import type { PrismaClient } from '@prisma/client';

export function getUserById(prismaInstance: PrismaClient) {
  return (id: string) => {
    try {
      return prismaInstance.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (_err) {
      throw new UserNotFoundError();
    }
  };
}

export function getUserByUsername(prismaInstance: PrismaClient) {
  return (username: string) => {
    return prismaInstance.user.findUnique({
      where: {
        username,
      },
    });
  };
}
