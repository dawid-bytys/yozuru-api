import type { PrismaClient } from '@prisma/client';

export async function clearDatabase(prismaInstance: PrismaClient) {
  await prismaInstance.$transaction([prismaInstance.user.deleteMany()]);
}
