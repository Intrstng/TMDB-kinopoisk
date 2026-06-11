import { z } from 'zod/v4';
import { BACKDROP_SIZE, LOGO_SIZE, POSTER_SIZE, PROFILE_SIZE, SORT_BY, STILL_SIZE } from '@/common/enums';
import { favoriteFilmSchema } from '@/common/pages/FavouritesPage/model/favoritePage.schemas.ts';

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
    backdrop_path: z.string().nullish(),
    genre_ids: z.array(z.number()),
    id: z.number().positive(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string().optional(),
    popularity: z.number(),
    poster_path: z.string().nullish(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number().nonnegative(),
    vote_count: z.number().nonnegative(),
    isFavorite: z.boolean().nullish(),
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
    path: z.url(),
    language: z.string().default('en-US').optional(),
    region: z.string().optional(),
    userUid: z.string().nullish(),
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
    userUid: z.string().nullish(),
});

/**
 * Get the top level details of a movie by ID.
 */
export const belongsToCollectionSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string(),
    poster_path: z.string().nullish(),
    backdrop_path: z.string().nullish(),
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
    adult: z.boolean().optional(),
    backdrop_path: z.string().nullish(),
    belongs_to_collection: belongsToCollectionSchema.nullish(),
    budget: z.number().int().nonnegative().optional(),
    genres: z.array(filmGenreSchema).optional(),
    homepage: z.string().optional(),
    id: z.number().int().nonnegative().optional(),
    imdb_id: z.string().nullable().optional(),
    origin_country: z.array(z.string()).optional(),
    original_language: z.string().optional(),
    original_title: z.string().optional(),
    overview: z.string().optional(),
    popularity: z.number().nonnegative().optional(),
    poster_path: z.string().nullish(),
    production_companies: z.array(productionCompanySchema).optional(),
    production_countries: z.array(productionCountrySchema).optional(),
    release_date: z.string().optional(),
    revenue: z.number().int().nonnegative().optional(),
    runtime: z.number().int().nonnegative().optional(),
    spoken_languages: z.array(spokenLanguageSchema).optional(),
    status: z.string().optional(),
    tagline: z.string().optional(),
    title: z.string().optional(),
    video: z.boolean().optional(),
    vote_average: z.number().nonnegative().optional(),
    vote_count: z.number().int().nonnegative().optional(),
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
    with_genres: z.string().optional(),
    sort_by: SortBySchema,
    vote_average_gte: z.number().nonnegative(),
    vote_average_lte: z.number().nonnegative(),
    userUid: z.string().nullish(),
});

/**
 * Get the list of official genres for movies.
 */
export const genresResponseSchema = z.object({
    genres: z.array(filmGenreSchema).optional(),
});

export const getGenresArgsSchema = z.object({
    language: z.string().default('en'),
});

/**
 * Get the similar movies based on genres and keywords.
 */
export const getSimilarFilmsArgsSchema = z.object({
    movie_id: z.number().int().nonnegative(),
    language: z.string().default('en-US'),
    page: z.number().int().positive().default(1),
});

/**
 * Get the credits.
 */
export const castItemSchema = z.object({
    adult: z.boolean().nullable(),
    gender: z.number().int().nonnegative(),
    id: z.number().int().nonnegative(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number().nonnegative(),
    profile_path: z.string().nullable(),
    cast_id: z.number().int().nonnegative(),
    character: z.string(),
    credit_id: z.string(),
    order: z.number().int().nonnegative(),
});

export const creditsResponseSchema = z.object({
    id: z.number().int().nonnegative(),
    cast: z.array(castItemSchema),
});

export const getCreditsArgsSchema = z.object({
    movie_id: z.number().int().nonnegative(),
    language: z.string().default('en-US'),
});

/** Favorite films
 *  Firestore database queries
 *
 *  getFavorites query
 */
export const getFavoritesArgsSchema = z.object({
    userUid: z.string(),
});

/** addToFavorites mutation
 */
export const addToFavoritesArgsSchema = z.object({
    film: favoriteFilmSchema,
    userUid: z.string(),
});

/** removeFromFavorites mutation
 */
export const removeFromFavoritesArgsSchema = z.object({
    filmId: z.number().int().nonnegative(),
    userUid: z.string(),
});

export const favoritesDocumentSchema = z.object({
    favorites: z.array(favoriteFilmSchema),
    userUid: z.string(),
    timestamp: z.number().int().nonnegative(),
});

/** PatchCollection & Patch
 *  are from RTK Query docs
 */
const PatchOpSchema = z.enum(['replace', 'remove', 'add']);

export const patchSchema = z.object({
    op: PatchOpSchema,
    path: z.array(z.union([z.string(), z.number()])),
    value: z.any().optional(),
});

export const patchCollectionSchema = z.object({
    patches: z.array(patchSchema),
    inversePatches: z.array(patchSchema),
    undo: z.function({
        input: [],
        output: z.void(),
    }),
});
