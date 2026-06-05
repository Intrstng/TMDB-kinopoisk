import type { SxProps } from '@mui/material';

export const resetButtonSx: SxProps = {
    padding: '0.4rem 0.75rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    borderColor: 'text.secondary',
    textDecoration: 'none',
    fontFamily: 'ShareTechFont, sans-serif',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    transition: 'all 0.3s ease',
    backgroundColor: 'action.selected',
    color: 'text.secondary',
    '&:hover': {
        color: 'action.selected',
        backgroundColor: 'text.primary',
    },
    '&.active': {
        color: 'secondary.dark',
        borderColor: 'secondary.dark',
        backgroundColor: 'action.selected',
    },
};
