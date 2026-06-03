import type { SxProps } from '@mui/material';

export const searchTitleSx: SxProps = {
    margin: '2rem 0 1.25rem',
    fontSize: '2.25rem',
    fontFamily: 'ProtestFont, sans-serif',
    color: 'text.secondary',
    textTransform: 'capitalize',
    letterSpacing: '0.05rem',

    '@media (width <= 480px)': {
        margin: '1.5rem 0 1rem',
        fontSize: '1.8rem',
    },
};

export const searchClueSx: SxProps = {
    marginTop: '0.25rem',
    fontSize: '1em',
    fontFamily: 'ProtestFont, sans-serif',
    color: 'text.secondary',
    letterSpacing: '0.06rem',

    '@media (width <= 480px)': {
        fontSize: '0.8em',
    },
};

export const containerSx: SxProps = {
    margin: '0 auto',
};

export const moviesGridSx: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, minmax(200px, 1fr))',
    gap: '1.5rem',
    padding: '1.25rem 0',

    '@media (width <= 1200px)': {
        gridTemplateColumns: 'repeat(4, minmax(150px, 1fr))',
        gap: '1rem',
    },

    '@media (width <= 768px)': {
        gridTemplateColumns: 'repeat(2, minmax(200px, 1fr))',
        gap: '1rem',
    },

    '@media (width <= 480px)': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '0.75rem',
    },
};

export const searchSx = {
    searchTitle: searchTitleSx,
    searchClue: searchClueSx,
    container: containerSx,
    moviesGrid: moviesGridSx,
} as const;
