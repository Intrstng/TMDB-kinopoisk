import type { SxProps } from '@mui/material';

export const backButtonSx: SxProps = {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    borderColor: 'text.secondary',
    textDecoration: 'none',
    color: 'text.secondary',
    fontFamily: 'ProtestFont, sans-serif',
    transition: 'all 0.3s ease',
    letterSpacing: '0.08rem',

    '&:hover': {
        color: 'action.selected',
        backgroundColor: 'text.secondary',
    },

    '&.active': {
        color: 'text.secondary',
        borderColor: 'text.secondary',
        backgroundColor: 'action.selected',
    },

    '@media (max-width: 480px)': {
        padding: '0.4rem 0.8rem',
        fontSize: '0.8rem',
    },
};
