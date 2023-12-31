import type { PrismaClient } from '@prisma/client';

export interface Dependencies {
  readonly prisma: PrismaClient;
}

export interface RegisterCredentials {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface UserPayload {
  readonly id: string;
  readonly iat: number;
  readonly exp: number;
}
