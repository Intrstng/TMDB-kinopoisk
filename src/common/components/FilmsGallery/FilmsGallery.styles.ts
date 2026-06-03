import type { SxProps } from '@mui/material';

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
