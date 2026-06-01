import type { SxProps } from '@mui/material';

export const moviesContainerSx: SxProps = {
    flex: 6,
};

export const sortedMoviesGridSx: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    paddingBottom: '2rem',

    '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(3, minmax(140px, 1fr))',
        gap: '1rem',
    },

    '@media (max-width: 480px)': {
        gridTemplateColumns: 'repeat(2, minmax(150px, 1fr))',
        gap: '0.75rem',
    },
};
