import { z } from 'zod/v4';
import {
    addToFavoritesArgsSchema,
    creditsResponseSchema,
    type detailsResponseSchema,
    favoritesDocumentSchema,
    fetchFilmsArgsSchema,
    filmResponseSchema,
    filmsResponseSchema,
    genresResponseSchema,
    getCreditsArgsSchema,
    getFavoritesArgsSchema,
    getFilmArgsSchema,
    getGenresArgsSchema,
    getSimilarFilmsArgsSchema,
    patchCollectionSchema,
    removeFromFavoritesArgsSchema,
    searchFilmArgsSchema,
    sortFilmsArgsSchema,
} from '@/features/films/model/films.schemas.ts';

export type DetailsResponse = z.infer<typeof detailsResponseSchema>;
export type FilmsResponse = z.infer<typeof filmsResponseSchema>;
export type FilmResponse = z.infer<typeof filmResponseSchema>;
export type GenresResponse = z.infer<typeof genresResponseSchema>;
export type CreditsResponse = z.infer<typeof creditsResponseSchema>;

export type FetchFilmsArgs = z.infer<typeof fetchFilmsArgsSchema>;
export type SearchFilmArgs = z.infer<typeof searchFilmArgsSchema>;
export type GetFilmArgs = z.infer<typeof getFilmArgsSchema>;
export type SortFilmsArgs = z.infer<typeof sortFilmsArgsSchema>;
export type GetGenresArgs = z.infer<typeof getGenresArgsSchema>;
export type GetSimilarFilmsArgs = z.infer<typeof getSimilarFilmsArgsSchema>;
export type GetCreditsArgs = z.infer<typeof getCreditsArgsSchema>;

/** Favorite films
 *  Firestore database queries
 */
export type GetFavoritesArgs = z.infer<typeof getFavoritesArgsSchema>;
export type AddToFavoritesArgs = z.infer<typeof addToFavoritesArgsSchema>;
export type RemoveFromFavoritesArgs = z.infer<typeof removeFromFavoritesArgsSchema>;
export type FavoritesDocument = z.infer<typeof favoritesDocumentSchema>;
export type PatchCollection = z.infer<typeof patchCollectionSchema>;
