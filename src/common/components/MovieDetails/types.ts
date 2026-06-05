import { POSTER_SIZE } from '@/common/enums';
import type { FilmResponse } from '@/features/films/api/filmsApi.types.ts';

export type DetailsProps = {
    filmId: string;
    getPosterUrlCb: (posterPath: string | null | undefined, size?: POSTER_SIZE) => string | undefined;
};

export type MovieDetailsHeaderProps = {
    data: FilmResponse | undefined;
};

export type MovieDetailsInfoProps = {
    data: FilmResponse | undefined;
};

export type MovieDetailsGenresProps = {
    data: FilmResponse | undefined;
    isLoading: boolean;
};

export type MovieDetailsPosterProps = {
    sourceUrl: string;
    text: string | undefined;
};
