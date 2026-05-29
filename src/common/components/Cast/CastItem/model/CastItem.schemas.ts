import { z } from 'zod';

export const castItemPropsSchema = z.object({
    name: z.string(),
    character: z.string(),
    avatarUrl: z.url(),
});
