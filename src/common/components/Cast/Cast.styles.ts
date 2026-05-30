import type { SxProps } from '@mui/material';

export const castTitleSx: SxProps = {
    marginBottom: '1.75rem',
    fontFamily: '"AntonFont", sans-serif',
    fontSize: '2rem',
    letterSpacing: '0.03rem',
};

export const moviesGridSx = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '1.5rem',
    paddingBottom: '2.25rem',

    '@media (max-width: 1200px)': {
        width: '80%',
        margin: '0 auto',
        gridTemplateColumns: 'repeat(3, minmax(160px, 1fr))',
        gap: '1rem',
    },

    '@media (max-width: 768px)': {
        width: '100%',
        gridTemplateColumns: 'repeat(3, minmax(150px, 1fr))',
        gap: '1rem',
    },

    '@media (max-width: 640px)': {
        gridTemplateColumns: 'repeat(2, minmax(150px, 1fr))',
        gap: '0.8rem',
    },

    '@media (max-width: 480px)': {
        gridTemplateColumns: 'repeat(2, minmax(130px, 1fr))',
        gap: '0.8rem',
    },
} as const;
