import { Type } from '@sinclair/typebox';

export const meSchema = {
  response: {
    200: {
      success: Type.Boolean(),
      data: Type.Object({
        id: Type.String(),
        username: Type.String(),
        email: Type.String(),
        firstName: Type.String(),
        lastName: Type.String(),
        createdAt: Type.String(),
        thumbnail: Type.String(),
      }),
    },
  },
} as const;
