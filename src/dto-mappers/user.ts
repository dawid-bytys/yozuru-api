import type { User } from '@prisma/client';

export function mapUserToDto({ id, username, email, firstName, lastName, thumbnail }: User) {
  return {
    id,
    username,
    email,
    firstName,
    lastName,
    thumbnail,
  };
}
