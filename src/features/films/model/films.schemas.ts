import { z } from 'zod/v4';
import { BACKDROP_SIZE, LOGO_SIZE, POSTER_SIZE, PROFILE_SIZE, SORT_BY, STILL_SIZE } from '@/common/enums';

/**
 * Query the API configuration details.
 */

export const filmsImagesSchema = z.object({
    base_url: z.url(),
    secure_base_url: z.url(),
    backdrop_sizes: z.array(z.enum(BACKDROP_SIZE)),
    logo_sizes: z.array(z.enum(LOGO_SIZE)),
    poster_sizes: z.array(z.enum(POSTER_SIZE)),
    profile_sizes: z.array(z.enum(PROFILE_SIZE)),
    still_sizes: z.array(z.enum(STILL_SIZE)),
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
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    id: z.number().positive(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
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
    language: z.string().default('en-US').optional(),
    region: z.string().optional(),
});

/**
 * Search for movies by their original, translated and alternative titles.
 */
export const searchFilmArgsSchema = z.object({
    query: z.string(),
    include_adult: z.boolean().default(false).optional(),
    language: z.string().default('en-US').optional(),
    primary_release_year: z.string().optional(),
    page: z.number().positive().default(1).optional(),
    region: z.string().optional(),
    year: z.string().optional(),
});

/**
 * Get the top level details of a movie by ID.
 */
export const belongsToCollectionSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
});

export const filmGenreSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string(),
});

export const productionCompanySchema = z.object({
    id: z.number().int().nonnegative(),
    logo_path: z.string().nullable(),
    name: z.string(),
    origin_country: z.string(),
});

export const productionCountrySchema = z.object({
    iso_3166_1: z.string(),
    name: z.string(),
});

export const spokenLanguageSchema = z.object({
    english_name: z.string(),
    iso_639_1: z.string(),
    name: z.string(),
});

export const filmResponseSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    belongs_to_collection: belongsToCollectionSchema.nullable(),
    budget: z.number().int().nonnegative(),
    genres: z.array(filmGenreSchema),
    homepage: z.url(),
    id: z.number().int().nonnegative(),
    imdb_id: z.string(),
    origin_country: z.array(z.string()),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number().nonnegative(),
    poster_path: z.string().nullable(),
    production_companies: z.array(productionCompanySchema),
    production_countries: z.array(productionCountrySchema),
    release_date: z.string(),
    revenue: z.number().int().nonnegative(),
    runtime: z.number().int().nonnegative(),
    spoken_languages: z.array(spokenLanguageSchema),
    status: z.string(),
    tagline: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number().nonnegative(),
    vote_count: z.number().int().nonnegative(),
});

export const getFilmArgsSchema = z.string();

/**
 * Find movies using over 30 filters and sort options.
 */
export const SortBySchema = z.enum([
    SORT_BY.POPULARITY_ASC,
    SORT_BY.POPULARITY_DESC,
    SORT_BY.VOTE_AVERAGE_ASC,
    SORT_BY.VOTE_AVERAGE_DESC,
    SORT_BY.PRIMARY_RELEASE_DATE_ASC,
    SORT_BY.PRIMARY_RELEASE_DATE_DESC,
    SORT_BY.ORIGINAL_TITLE_ASC,
    SORT_BY.ORIGINAL_TITLE_DESC,
]);

export const sortFilmsArgsSchema = z.object({
    with_genres: z.string(),
    sort_by: SortBySchema,
    vote_average_gte: z.number().nonnegative(),
    vote_average_lte: z.number().nonnegative(),
    page: z.number().int().positive(),
});
