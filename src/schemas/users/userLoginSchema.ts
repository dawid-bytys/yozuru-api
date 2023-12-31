import { Type } from '@sinclair/typebox';

export const userLoginSchema = {
  body: Type.Object({
    username: Type.String({ minLength: 5, maxLength: 20 }),
    password: Type.RegEx(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  }),
  response: {
    200: {
      success: Type.Boolean(),
      message: Type.String(),
    },
  },
} as const;
