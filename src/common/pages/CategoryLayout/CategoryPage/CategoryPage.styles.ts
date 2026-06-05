import type { SxProps } from '@mui/material';

const containerSx: SxProps = {
    margin: '1.5rem auto 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
};

const headerSx: SxProps = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const titleSx: SxProps = {
    margin: '0.5rem 0',
    fontSize: '2.25rem',
    fontFamily: 'ProtestFont, sans-serif',
    color: 'text.secondary',
    textTransform: 'capitalize',
    letterSpacing: '0.05rem',
    '@media (max-width: 480px)': {
        fontSize: '1.8rem',
    },
};

const categoryNavSx: SxProps = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.7rem',
};

const moviesGridSx: SxProps = {
    padding: '1.25rem 0',
    display: 'grid',
    width: '100%',
    gap: '1.25rem',
    gridTemplateColumns: 'repeat(5, minmax(210px, 1fr))',

    '@media (max-width: 1200px)': {
        gridTemplateColumns: 'repeat(4, minmax(150px, 1fr))',
        gap: '1rem',
    },

    '@media (max-width: 940px)': {
        gridTemplateColumns: 'repeat(3, minmax(150px, 1fr))',
        gap: '1rem',
    },

    '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(3, minmax(140px, 1fr))',
        gap: '1rem',
    },

    '@media (max-width: 640px)': {
        gridTemplateColumns: 'repeat(2, minmax(140px, 1fr))',
        gap: '0.75rem',
    },

    '@media (max-width: 480px)': {
        gridTemplateColumns: 'minmax(140px, 1fr)',
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

export const categorySx = {
    container: containerSx,
    header: headerSx,
    title: titleSx,
    nav: categoryNavSx,
    moviesGrid: moviesGridSx,
    error: errorSx,
} as const;
