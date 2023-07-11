import { Type } from '@sinclair/typebox';

export const usernameChangeSchema = {
  body: Type.Object({
    newUsername: Type.String({ minLength: 5, maxLength: 20 }),
  }),
  response: {
    204: {
      success: Type.Boolean(),
      message: Type.String(),
    },
  },
} as const;
