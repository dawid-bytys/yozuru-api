import { PrismaClient } from '@prisma/client';

export function bootstrapDependencies() {
  const prisma = new PrismaClient();

  return {
    prisma,
  };
}
