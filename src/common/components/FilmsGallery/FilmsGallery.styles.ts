import type { SxProps } from '@mui/material';

export const containerSx: SxProps = {
    margin: '1.25rem auto 2rem',
};

export const galleryHeaderSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',

    '@media (width <= 480px)': {
        marginBottom: '1.25rem',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
};

export const galleryTitleSx: SxProps = {
    margin: '1rem 0 2rem',
    fontSize: '2.25rem',
    fontFamily: 'ProtestFont, sans-serif',
    color: 'text.secondary',
    textTransform: 'capitalize',
    letterSpacing: '0.05rem',

    '@media (width <= 480px)': {
        fontSize: '1.8rem',
        margin: '1rem 0 0.75rem',
    },
};

export const moviesGridSx: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '1.5rem',
    paddingBottom: '2.25rem',
    borderBottom: '0.06rem solid #90cea1',

    '@media (width <= 768px)': {
        gridTemplateColumns: 'repeat(3, minmax(140px, 1fr))',
        gap: '16px',
    },

    '@media (width <= 480px)': {
        gridTemplateColumns: 'minmax(150px, 1fr)',
        gap: '12px',
    },
};

export const galleryErrorSx: SxProps = {
    marginTop: '0.5rem',
    fontSize: '1rem',
    fontFamily: 'ProtestFont, sans-serif',
    color: 'text.secondary',
    letterSpacing: '0.06rem',
};

export const gallerySx = {
    container: containerSx,
    galleryHeader: galleryHeaderSx,
    title: galleryTitleSx,
    moviesGrid: moviesGridSx,
    error: galleryErrorSx,
} as const;
