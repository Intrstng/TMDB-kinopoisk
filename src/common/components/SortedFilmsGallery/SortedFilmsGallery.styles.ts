import type { SxProps } from '@mui/material';

export const moviesContainerSx: SxProps = {
    flex: 6,
};

export const sortedMoviesGridSx: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    paddingBottom: '2rem',

    '@media (max-width: 940px)': {
        gridTemplateColumns: 'repeat(3, minmax(140px, 1fr))',
        gap: '1rem',
    },

    '@media (max-width: 480px)': {
        gridTemplateColumns: 'repeat(2, minmax(150px, 1fr))',
        gap: '0.75rem',
    },
};

const errorSx: SxProps = {
    margin: '2.5rem 0 1.5rem',
    fontSize: '1rem',
    minWidth: '20rem',
    fontFamily: 'ProtestFont, sans-serif',
    color: 'text.secondary',
    letterSpacing: '0.06rem',
};

export const sortedFilmsSx = {
    container: moviesContainerSx,
    moviesGrid: sortedMoviesGridSx,
    error: errorSx,
} as const;
