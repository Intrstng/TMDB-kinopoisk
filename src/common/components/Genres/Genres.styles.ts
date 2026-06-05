import type { SxProps } from '@mui/material';

export const genresBlockSx: SxProps = {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
};

export const genresControlsSx: SxProps = {
    margin: '0.25rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    borderColor: 'text.secondary',
    textDecoration: 'none',
    color: 'text.secondary',
    fontFamily: 'ShareTechFont, sans-serif',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'action.hover',
    },
    '&.active': {
        color: 'text.secondary',
        borderColor: 'text.secondary',
        backgroundColor: 'action.selected',
    },
};
