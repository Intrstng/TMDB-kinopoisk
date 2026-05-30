import type { SxProps } from '@mui/material';

export const resetButtonSx: SxProps = {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    borderColor: 'text.secondary',
    textDecoration: 'none',
    color: 'text.secondary',
    fontFamily: 'ShareTechFont, sans-serif',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',

    '&:hover': {
        backgroundColor: 'action.hover',
    },

    '&.active': {
        color: 'secondary.dark',
        borderColor: 'secondary.dark',
        backgroundColor: 'action.selected',
    },
};
