import type { SxProps } from '@mui/material';

const movieDetailsPosterSx: SxProps = {
    minHeight: '26rem',
};

const filmInfoSkeletonSx: SxProps = {
    marginBottom: '1.5rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '1.25rem',
};

const genreItemSx: SxProps = {
    width: '10%',
    height: '2.5rem',
};

export const movieDetailsSkeletonSx = {
    poster: movieDetailsPosterSx,
    filmInfo: filmInfoSkeletonSx,
    genreItem: genreItemSx,
} as const;
