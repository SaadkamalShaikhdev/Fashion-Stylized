import { z } from 'zod';

// Separate password schema for reusability
export const passwordSchema = z
.string()
  .min(8, 'Password must be at least 8 characters')
  .max(32, 'Password must not exceed 32 characters')


export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
,  
  password: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
