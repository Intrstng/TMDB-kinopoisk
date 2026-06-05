import { z } from 'zod';
import { NESTED_PATHSchema } from '@/common/schemas/schemas.ts';

export const filmGalleryPropsSchema = z.object({
    path: NESTED_PATHSchema,
    title: z.string(),
});
