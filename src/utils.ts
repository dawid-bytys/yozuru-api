import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getEnv } from './config';
import type { UserPayload } from './types';

export function encryptPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePasswords(password: string, encryptedPassword: string) {
  return bcrypt.compareSync(password, encryptedPassword);
}

export function isPrismaError(err: unknown): err is PrismaClientKnownRequestError {
  if (err && err instanceof PrismaClientKnownRequestError) {
    return true;
  }

  return false;
}

export function errorResponse(message: string) {
  return { success: false, message };
}

export function generateAccessToken(id: string, expiresIn: string) {
  return jwt.sign({ id }, getEnv('JWT_SECRET'), { expiresIn });
}

export function authorizedUserPayload(accessToken: string) {
  try {
    return jwt.verify(accessToken, getEnv('JWT_SECRET')) as UserPayload;
  } catch (_err) {
    return undefined;
  }
}
