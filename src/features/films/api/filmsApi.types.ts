import { z } from 'zod/v4';
import {
    type detailsResponseSchema,
    fetchFilmsArgsSchema,
    filmsResponseSchema,
} from '@/features/films/model/films.schemas.ts';

export type DetailsResponse = z.infer<typeof detailsResponseSchema>;
export type FilmsResponse = z.infer<typeof filmsResponseSchema>;
export type FetchFilmsArgs = z.infer<typeof fetchFilmsArgsSchema>;
