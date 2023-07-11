import { encryptPassword } from '@/utils';
import type { PrismaClient } from '@prisma/client';

export function updateEmail(prismaInstance: PrismaClient) {
  return (id: string, newEmail: string) => {
    return prismaInstance.user.update({
      where: { id },
      data: { email: newEmail },
    });
  };
}
