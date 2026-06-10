import { z } from 'zod';

export const signUpPageFormArgsSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
});

export const signUpPageFormSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, 'Name is required')
            .regex(/^[A-Z]/, 'Name must start with a capital letter')
            .regex(/^[A-Z][a-zA-Z\s\-']*$/, 'Name can only contain letters'),
        email: z.string().toLowerCase().trim().min(1, 'Email is required').email('Invalid email format'),
        password: z
            .string()
            .min(1, 'Password is required')
            .regex(
                /^(?=.*\d)(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']/u,
                'Password must have at least one letter, one digit, one special character'
            )
            .min(8, 'Password must be at least 8 characters long'),

        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
