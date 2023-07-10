import { Type } from '@sinclair/typebox';

export const userRegisterSchema = {
  body: Type.Object({
    username: Type.String({ minLength: 5, maxLength: 20 }),
    password: Type.String({ minLength: 8, maxLength: 20 }),
    email: Type.String({ format: 'email' }),
    firstName: Type.String({ minLength: 2, maxLength: 20 }),
    lastName: Type.String({ minLength: 2, maxLength: 20 }),
  }),
  response: {
    200: {
      success: Type.Boolean(),
      message: Type.String(),
    },
  },
} as const;
