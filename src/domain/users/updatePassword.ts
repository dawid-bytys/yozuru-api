import { encryptPassword } from '@/utils';
import type { PrismaClient } from '@prisma/client';

export function updatePassword(prismaInstance: PrismaClient) {
  return (id: string, newPassword: string) => {
    const encryptedPassword = encryptPassword(newPassword);

    return prismaInstance.user.update({
      where: { id },
      data: { password: encryptedPassword },
    });
  };
}
