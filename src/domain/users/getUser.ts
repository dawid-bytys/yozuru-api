import type { PrismaClient } from '@prisma/client';

export function getUserById(prismaInstance: PrismaClient) {
  return (id: string) => {
    return prismaInstance.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  };
}

export function getUserByUsername(prismaInstance: PrismaClient) {
  return (username: string) => {
    return prismaInstance.user.findUniqueOrThrow({
      where: {
        username,
      },
    });
  };
}
