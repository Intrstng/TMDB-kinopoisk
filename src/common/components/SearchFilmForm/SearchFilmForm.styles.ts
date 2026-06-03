import type { SxProps } from '@mui/material';

export const SubmitBtnSx: SxProps = {
    width: '12rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    borderColor: 'text.secondary',
    textDecoration: 'none',
    color: 'text.secondary',
    fontFamily: 'ProtestFont, sans-serif',
    transition: 'all 0.3s ease',
    backgroundColor: 'action.selected',

    '&:hover': {
        color: 'action.selected',
        backgroundColor: 'text.secondary',
        borderColor: 'action.selected',
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

    '&.Mui-disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',

        borderColor: 'text.secondary',
        color: 'text.secondary',
        backgroundColor: '#0d253f',
    },
};
