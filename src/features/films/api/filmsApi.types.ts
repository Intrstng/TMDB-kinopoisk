import { z } from 'zod/v4';
import {
    creditsResponseSchema,
    type detailsResponseSchema,
    fetchFilmsArgsSchema,
    filmResponseSchema,
    filmsResponseSchema,
    genresResponseSchema,
    getCreditsArgsSchema,
    getFilmArgsSchema,
    getGenresArgsSchema,
    getSimilarFilmsArgsSchema,
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
