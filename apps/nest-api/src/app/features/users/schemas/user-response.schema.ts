import { z } from 'zod';

export const userParamsSchema = z.object({
  // id: z.coerce.number().int().positive(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  address: z.string(),
  password: z.string(),
  phone: z.coerce.number(),
});

export type UserParams = z.infer<typeof userParamsSchema>;
