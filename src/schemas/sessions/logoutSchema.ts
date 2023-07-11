import { Type } from '@sinclair/typebox';

export const logoutSchema = {
  response: {
    205: {
      success: Type.Boolean(),
      message: Type.String(),
    },
  },
} as const;
