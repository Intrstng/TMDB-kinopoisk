import type { SxProps } from '@mui/material';

export const similarTitleSx: SxProps = {
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
    borderBottom: '0.06rem solid #90cea1',

    '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(3, minmax(140px, 1fr))',
        gap: '16px',
    },

    '@media (max-width: 480px)': {
        gridTemplateColumns: 'repeat(2, minmax(150px, 1fr))',
        gap: '12px',
    },
} as const;
