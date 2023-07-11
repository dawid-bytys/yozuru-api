import type { PrismaClient } from '@prisma/client';

export function updateUsername(prismaInstance: PrismaClient) {
  return (id: string, newUsername: string) => {
    return prismaInstance.user.update({
      where: { id },
      data: { username: newUsername },
    });
  };
}
