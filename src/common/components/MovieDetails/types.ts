import { POSTER_SIZE } from '@/common/enums';

export type DetailsProps = {
    filmId: string;
    getPosterUrlCb: (posterPath: string | null | undefined, size?: POSTER_SIZE) => string | undefined;
};
