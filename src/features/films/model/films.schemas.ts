import { z } from 'zod/v4';

/**
 * Query the API configuration details.
 */

export const filmsImagesSchema = z.object({
    base_url: z.url(),
    secure_base_url: z.url(),
    backdrop_sizes: z.array(z.enum(['w300', 'w780', 'w1280', 'original'])),
    logo_sizes: z.array(z.enum(['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'])),
    poster_sizes: z.array(z.enum(['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'])),
    profile_sizes: z.array(z.enum(['w45', 'w185', 'h632', 'original'])),
    still_sizes: z.array(z.enum(['w92', 'w185', 'w300', 'original'])),
});

export const filmsChangeKeysSchema = z.array(z.string());

export const detailsResponseSchema = z.object({
    images: filmsImagesSchema,
    change_keys: filmsChangeKeysSchema,
});

/**
 * Get a list of movies.
 * Popular, Top Rated, Upcoming, Now Playing
 */
export const filmResultSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string(),
    genre_ids: z.array(z.number()),
    id: z.number().positive(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number().nonnegative(),
    vote_count: z.number().nonnegative(),
});

export const filmDatesSchema = z.object({
    maximum: z.string(),
    minimum: z.string(),
});

export const filmsResponseSchema = z.object({
    dates: filmDatesSchema.optional(),
    page: z.number().positive(),
    results: z.array(filmResultSchema),
    total_pages: z.number().nonnegative(),
    total_results: z.number().nonnegative(),
});

export const fetchFilmsArgsSchema = z.object({
    category: z.string(),
    page: z.number().positive().optional(),
});
