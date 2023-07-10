import type { PrismaClient } from '@prisma/client';

export interface Dependencies {
  readonly prisma: PrismaClient;
}
