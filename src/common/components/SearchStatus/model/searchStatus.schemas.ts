import { z } from 'zod';

export const searchStatusSchema = z.object({
    isFetching: z.boolean(),
    hasResults: z.boolean(),
    query: z.string(),
});
