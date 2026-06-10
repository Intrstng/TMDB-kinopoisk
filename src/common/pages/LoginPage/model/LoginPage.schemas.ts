import { z } from 'zod';

export const loginPageFormArgsSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const loginPageFormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
        .string()
        .min(1, 'Password is required')
        .regex(
            /^(?=.*\d)(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']/u,
            'Password must have at least one letter, one digit, one special character'
        )
        .min(8, 'Password must be at least 8 characters long'),
});
