import { z } from 'zod';

export const searchFilmArgsSchema = z.object({
    search: z.string(),
});

export const searchFilmFormSchema = z.object({
    search: z
        .string()
        .min(1, 'The search value length must be more than 1 character')
        .max(20, 'The search value length must be less than 20 characters'),
});
