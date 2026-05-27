import { z } from 'zod/v4';
import {
    type detailsResponseSchema,
    fetchFilmsArgsSchema,
    filmResponseSchema,
    filmsResponseSchema,
    getFilmArgsSchema,
    searchFilmArgsSchema,
    sortFilmsArgsSchema,
} from '@/features/films/model/films.schemas.ts';

export type DetailsResponse = z.infer<typeof detailsResponseSchema>;
export type FilmsResponse = z.infer<typeof filmsResponseSchema>;
export type FilmResponse = z.infer<typeof filmResponseSchema>;

export type FetchFilmsArgs = z.infer<typeof fetchFilmsArgsSchema>;
export type SearchFilmArgs = z.infer<typeof searchFilmArgsSchema>;
export type GetFilmArgs = z.infer<typeof getFilmArgsSchema>;
export type SortFilmsArgs = z.infer<typeof sortFilmsArgsSchema>;
