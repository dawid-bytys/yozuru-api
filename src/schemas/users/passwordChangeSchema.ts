import { Type } from '@sinclair/typebox';

export const passwordChangeSchema = {
  body: Type.Object({
    newPassword: Type.RegEx(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  }),
  response: {
    204: {
      success: Type.Boolean(),
      message: Type.String(),
    },
  },
} as const;
