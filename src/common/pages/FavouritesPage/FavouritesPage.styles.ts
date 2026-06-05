import type { SxProps } from '@mui/material';

const containerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minWidth: {
        xs: '100%', // mobile
        sm: '90%', // tablet
        md: '85%', // small desktop   (or md: "1000px")
        lg: '1220px', // large desktop
    },
};

const favoritesTitleSx: SxProps = {
    margin: '2rem 0 0.5rem',
    fontSize: '2.25rem',
    fontFamily: 'ProtestFont, sans-serif',
    color: 'text.secondary',
    textTransform: 'capitalize',
    letterSpacing: '0.05rem',
};

const blockSx: SxProps = {
    margin: '0 auto',
};

const moviesGridSx: SxProps = {
    display: 'grid',
    gap: '1.5rem',
    padding: '1.25rem 0',
    gridTemplateColumns: 'repeat(5, 200px)',

    '@media (max-width: 1200px)': {
        gridTemplateColumns: 'repeat(4, minmax(160px, 1fr))',
        gap: '1rem',
    },

    '@media (max-width: 940px)': {
        gridTemplateColumns: 'repeat(3, minmax(160px, 1fr))',
        gap: '1rem',
    },

    '@media (max-width: 640px)': {
        gridTemplateColumns: 'repeat(3, minmax(120px, 1fr))',
        gap: '0.75rem',
    },

    '@media (max-width: 480px)': {
        gridTemplateColumns: 'repeat(2, minmax(120px, 1fr))',
        gap: '0.75rem',
    },
};

export const favouritesPageSx = {
    container: containerSx,
    block: blockSx,
    moviesGrid: moviesGridSx,
    favoritesTitle: favoritesTitleSx,
} as const;
