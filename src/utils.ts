import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';

export function encryptPassword(password: string) {
  return bcrypt.hashSync(password, 10);
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
