import { Type } from '@sinclair/typebox';

export const emailChangeSchema = {
  body: Type.Object({
    newEmail: Type.String({ format: 'email' }),
  }),
  response: {
    204: {
      success: Type.Boolean(),
      message: Type.String(),
    },
  },
} as const;
