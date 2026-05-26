import { z } from 'zod';
import { IconVariantSchema, PATHSchema } from '@/common/schemas/schemas.ts';

export const logoPropsSchema = z.object({
    path: PATHSchema,
    variant: IconVariantSchema,
    className: z.string().optional(),
});
