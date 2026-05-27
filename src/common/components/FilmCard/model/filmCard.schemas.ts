import { z } from 'zod/v4';
import { filmResultSchema } from '@/features/films/model/films.schemas.ts';

export const filmCardPropsSchema = z.object({
    film: filmResultSchema,
    source: z.url().optional(),
});
