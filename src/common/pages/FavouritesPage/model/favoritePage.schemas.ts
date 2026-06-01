import { z } from 'zod/v4';

export const favoriteFilmSchema = z.object({
    id: z.number(),
    title: z.string(),
    posterUrl: z.string().nullish(),
    voteAverage: z.number(),
});

export const favoriteFilmCardPropsSchema = z.object({
    filmId: z.number(),
    title: z.string(),
    source: z.url().nullish(),
    rating: z.number(),
    onRemove: z.function({
        input: [z.array(favoriteFilmSchema)],
        output: z.void(),
    }),
});
