import { z } from 'zod/v4';

export const favoriteFilmSchema = z.object({
    id: z.number(),
    title: z.string(),
    posterUrl: z.string().nullish(),
    voteAverage: z.number(),
});

export const favoriteFilmsResponseSchema = z.array(favoriteFilmSchema);

export const favoriteFilmCardPropsSchema = z.object({
    filmId: z.number(),
    title: z.string(),
    source: z.url().nullish(),
    rating: z.number(),
    isCardLoading: z.boolean(),
});
